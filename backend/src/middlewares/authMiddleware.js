import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware for secure authentication ---> user can not do anything withut being Logged in
export const protect = async(req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
        if(!token) {
            return res.status(401).json({message : "Not authenticated" }); // Token not found error
        }
        // decode the authToken to verify the user and maintain the privacy
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password"); // Dont't return the password 
        if(!user) {
            return res.status(401).json({ message : "User not found"});
        }
        // Set req.user to current user
        req.user = user;
        next();

    } catch (error) {
        if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message : "Token expired, please login again" });
    }
       return res.status(401).json({ message : "Invalid token" });
    }
}

// role-based guard
export const authorizeRoles = (...roles) => async (req,res,next) => {
    if(!req.user) {
        return res.status(401).json({ message : "Not authenticated" });
    }
    if(!roles.includes(req.user.role)) {
        return res.status(403).json({ message : "Forbidden" });
    }
    next();
}