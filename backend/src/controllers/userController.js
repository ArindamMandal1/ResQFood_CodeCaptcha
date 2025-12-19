import User from "../models/User.js";
import axios from "axios";
import cloudinary from "../config/cloudinary.js";
import foodPost from "../models/foodPost.js";

// Update profile and optionally single avatar upload (req.file)
export const updateProfile = async(req, res) => {
    try {
    const userId = req.user._id;
    const { name, address, contactInfo } = req.body;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (name) {
        user.name = name;
    }
    if (contactInfo) {
        user.contactInfo = contactInfo;
    }

    if (contactInfo && !/^\d{10}$/.test(contactInfo)) {
        return res.status(400).json({ success: false, message: "Invalid contact number" });
    }

    if (address && address !== user.address) {
      user.address = address;
      // geocode via Mapbox
      const token = process.env.MAPBOX_ACCESS_TOKEN;
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}&limit=1`;
      try {
            const geoRes = await axios.get(url);
            const feat = geoRes.data.features?.[0];
            if (feat) {
              user.location = { type: "Point", coordinates: feat.geometry.coordinates };
            }
        } catch (err) {
            console.warn("Mapbox geocoding failed :", err.message);
        }
    }

    if (req.file) {
      // multer-storage-cloudinary sets path and filename
      user.avatar = { url : req.file.path, public_id : req.file.filename };
    }

    await user.save();
    res.json({ success : true, message : "Profile updated successfully", 
    user : {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    contactInfo: user.contactInfo,
    address: user.address,
    location: user.location,
    avatar: user.avatar,
  }, 
  });

  } catch (error) {
    res.status(500).json({ success : false, message : error.message });
  }
};


export const deleteProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;

    // NGO-specific cleanup
    if (role === "ngo") {
      await foodPost.updateMany(
        { claimedBy: userId },
        {
          $set: {
            claimedBy: null,
            status: "available",
            claimedAt: null,
          },
        }
      );
    }

    // Restaurant-specific cleanup
    if (role === "restaurant") {
      const foodPosts = await foodPost.find({ restaurantId: userId });

      for (const post of foodPosts) {
        for (const img of post.food_image || []) {
          if (img.public_id) {
            await cloudinary.uploader.destroy(img.public_id);
          }
        }
      }

      await foodPost.deleteMany({ restaurantId: userId });
    }

    const user = await User.findById(userId);
    if (user?.avatar?.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    // Delete user
    await User.findByIdAndDelete(userId);

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Account deleted permanently",
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};