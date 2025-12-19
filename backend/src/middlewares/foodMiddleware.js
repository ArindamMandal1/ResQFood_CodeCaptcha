import FoodPost from "../models/foodPost.js";
import mongoose from "mongoose";

export const verifyRestaurantOwnership = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not authenticated",
      });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid food ID",
      });
    }

    const food = await FoodPost.findById(id);
    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food post not found",
      });
    }

    if (food.restaurantId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Not the owner",
      });
    }
    req.food = food;
    next();

  } catch (error) {
    console.error("verifyRestaurantOwnership error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};