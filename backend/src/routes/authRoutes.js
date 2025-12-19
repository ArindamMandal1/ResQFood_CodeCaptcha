import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { body } from "express-validator";
const router = express.Router();

router.post("/register", 
    [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 8 }).withMessage("Password min 8 chars"),
    body("confirmpassword").exists().withMessage("Confirm password required"),
    body("role").isIn(["restaurant", "ngo"]).withMessage("Invalid role"),
    body("address").notEmpty().withMessage("Address required"),
    body("contactInfo").notEmpty().withMessage("Contact info required"),
  ],register);

router.post("/login", login);
router.post("/logout", protect, logout);

export default router;