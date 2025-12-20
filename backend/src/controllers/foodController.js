import FoodPost from "../models/foodPost.js";
import { getIO } from "../socket/socketHandler.js";
/**
 * Create a food post
 * - req.files => array of uploaded images (cloudinary)
 * - req.body.location => optionally GeoJSON string or address string
 *   We prefer to require location coordinates in body for accuracy; but if you send address, backend can geocode.
 */
import axios from "axios";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";
import { foodClaimedOwnerTemplate, foodClaimedNgoTemplate, foodCollectedNgoTemplate, foodCollectedOwnerTemplate } from "../utils/emailTemplates.js";

const geocodeAddress = async (address) => {
  if (!address) return null;
  const token = process.env.MAPBOX_ACCESS_TOKEN;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}&limit=1`;
  const res = await axios.get(url);
  const feat = res.data.features?.[0];
  if (!feat) return null;
  const [lng, lat] = feat.geometry.coordinates;
  return { type: "Point", coordinates: [lng, lat] };
};

// Create a new food post
export const createFood = async (req, res) => {
  try {
    const { food_name, quantity, description, expiry_time, address } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(200).json({
        success: false,
        message: "Food image is required",
      });
    }
    const images = [
      {
        url: file.path,
        public_id: file.filename,
      },
    ];

    let geoPoint = null;

    // fallback : if address present, geocode
    if (address) {
      const g = await geocodeAddress(address);
      if (g) {
        geoPoint = g;
      }
    }

    // fallback : use restaurant's saved location
    if (!geoPoint) {
      const rest = await User.findById(req.user._id);
      if (rest?.location?.coordinates) {
        geoPoint = rest.location;
      }
    }

    if (!geoPoint) {
      return res.status(200).json({ success: false, message: "Location required (address or restaurant profile location)" });
    }

    if (!expiry_time) {
      return res.status(200).json({ success: false, message: "expiry_time is required" });
    }

    const post = await FoodPost.create({
      restaurantId: req.user._id,
      food_name,
      quantity,
      description,
      expiry_time: expiry_time ? new Date(expiry_time) : null,
      location: geoPoint,
      food_image: images,
    });

    const io = getIO();
    io.emit("new_food_post", {
      _id: post._id,
      food_name: post.food_name,
      quantity: post.quantity,
      description: post.description,
      expiry_time: post.expiry_time,
      location: post.location,
      food_image: post.food_image,
      restaurantId: post.restaurantId,
    });
   

    res.status(200).json({ success: true, message: "Notification sent", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all foodposts from specific restaurant
export const getFoodPostsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const foodPosts = await FoodPost.find({ restaurantId })
      .populate("restaurantId", "name address contactInfo")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: foodPosts.length,
      data: foodPosts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch food posts",
    });
  }
};

// Get all the food post from different restaurants
export const getAllFood = async (req, res) => {
  try {
    const posts = await FoodPost.find({ status: "available" }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Claimed food by any NGO
export const claimFood = async (req, res) => {
  try {
    const post = await FoodPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    if (post.status !== "available") {
      return res.status(400).json({ success: false, message: "Not available" });
    }

    post.status = "claimed";
    post.claimedBy = req.user._id;
    post.claimedAt = new Date();
    await post.save();

    // Send Email to restaurant
    const restaurant = await User.findById(post.restaurantId);
    const ngo = await User.findById(req.user._id);
    try {
      if (restaurant?.email) {
        await sendEmail({
          to: restaurant.email,
          subject: "🌱 Your food donation was claimed",
          html: foodClaimedOwnerTemplate({ food: post, ngo, restaurant }),
        });
      }
      if (ngo?.email) {
        await sendEmail({
          to: ngo.email,
          subject: "🍽 Food Claimed Successfully",
          html: foodClaimedNgoTemplate({ food: post, restaurant }),
        });
      }
    } catch (error) {
      console.error("Email sending failed:", error.message);
    }

    const io = getIO();
      io.emit("food_claimed_owner", {
        foodId: post._id,
        foodName: post.food_name,
        ngoName: ngo.name,
        ngoId: ngo._id,
        restaurantId: restaurant._id,
      });
      

      io.emit("food_claimed_ngo", {
        foodId: post._id,
        foodName: post.food_name,
        ngoId: ngo._id,
        restaurantName: restaurant.name,
        restaurantId: restaurant._id,
      });
      

      io.emit("food_unavailable", {
        foodId: post._id,
      });
      
    res.json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get food within radius (km) from given coords. If no coords passed, uses user's saved location
export const getNearbyFoods = async (req, res) => {
  try {
    let { radius_km } = req.query;
    radius_km = parseFloat(radius_km || "5");

    // use user's saved location if not provided
    if (!req.user || !req.user.location?.coordinates) {
      return res.status(400).json({ success: false, message: "Provide coordinates or set user profile location" });
    }
    const [lng, lat] = req.user.location.coordinates;

    const meters = radius_km * 1000;

    const foods = await FoodPost.find({
      status: "available",
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: meters
        }
      }
    });

    res.json({ success: true, foods });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Mark as collected
export const markCollected = async (req, res) => {
  try {
    const { id: foodId } = req.params;
    const ngoId = req.user._id;
    const food = await FoodPost.findById(foodId);
    if (!food) return res.status(404).json({ success: false, message: "Food not found" });
    const restaurant = await User.findById(food.restaurantId);
    

    if (!food.claimedBy || food.claimedBy.toString() !== ngoId.toString())
      return res.status(403).json({ error: "Unauthorized" });

    if (food.status !== "claimed") {
      return res.status(400).json({ message: "Food is not claimed yet" });
    }

    food.status = "collected";
    food.collectedAt = new Date();
    await food.save();

    // Send Email to NGO
    const ngo = await User.findById(ngoId);
    try {
      if (restaurant?.email) {
        await sendEmail({
          to: restaurant.email,
          subject: "✅ Your food donation has been collected",
          html: foodCollectedOwnerTemplate({
            food,
            ngo
          }),
        });
      }
      if (ngo?.email) {
        await sendEmail({
          to: ngo.email,
          subject: "🌟 Food collected successfully",
          html: foodCollectedNgoTemplate({
            food,
            restaurant
          }),
        });
      }
    } catch (error) {
      console.error("Email sending failed:", error.message);
    }

    const io = getIO();
      io.emit("food_collected_owner", {
        foodId: food._id,
        foodName: food.food_name,
        ngoName: ngo.name,
        ngoId: ngo._id,
        restaurantId: restaurant._id,
      });
     

      io.emit("food_collected_ngo", {
        foodId: food._id,
        foodName: food.food_name,
        ngoId: ngo._id,
        restaurantName: restaurant.name,
        restaurantId: restaurant._id,
      });
      

      io.emit("food_unavailable", {
        foodId: food._id,
      });
     
    res.json({ success: true, message: "Food marked as collected" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getClaimedFoodsByNGO = async (req, res) => {
  try {
    const ngoId = req.user._id;

    const foods = await FoodPost.find({
      claimedBy: ngoId,
      status: { $in: ["claimed", "collected"] },
    })
      .populate("restaurantId", "name address")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: foods.length,
      data: foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};