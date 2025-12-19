import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";
import { deleteProfile, updateProfile } from "../controllers/userController.js";

const router = express.Router();

// update profile & optional avatar upload (field 'avatar')
router.patch("/me", protect, upload.single("avatar"), updateProfile);
router.delete("/me", protect, deleteProfile);

// get current user (you can add more routes)
router.get("/me", protect, (req, res) => {
  const { _id, name, email, role, address, contactInfo, avatar, location } = req.user;
  res.json({ id: _id, name, email, role, address, contactInfo, avatar, location });
});

export default router;