import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import validator from "validator";
import axios from "axios";

// Generate a authToken for new users
const signToken = (user) => jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

// helper to geocode address using Mapbox (if address provided)
const geocodeAddress = async (address) => {
    if (!address) {
        return null;
    }
    const token = process.env.MAPBOX_ACCESS_TOKEN;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}&limit=1`;
    const res = await axios.get(url);
    const feat = res.data.features?.[0];
    if (!feat) return null;
    const [lng, lat] = feat.geometry.coordinates;
    return { type: "Point", coordinates: [lng, lat] };
}

// SignUp for new user - No Log in required
export const register = async (req, res) => {
    try {
        const { name, email, password, confirmpassword, role, address, contactInfo } = req.body;

        if (!name || !email || !password || !confirmpassword || !role || !address || !contactInfo) {
            return res.status(400).json({ success: false, message: "Fields are misssing" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid Email" });
        }

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ success: false, message: "Email already in use" });
        }

        if (!validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })) {
            return res.status(400).json({ success: false, message: "Password is not strong enough" });
        }

        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const phoneRegex = /^\d{10}$/;

        if (!phoneRegex.test(contactInfo)) {
            return res.status(400).json({
                success: false,
                message: "Phone number must be exactly 10 digits",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hashed, role, address, contactInfo });

        // geocode address to location
        if (address) {
            const geo = await geocodeAddress(address);
            if (geo) {
                user.location = geo;
            }
        }

        await user.save();

        res.status(201).json({ success: true, message: "User registered successfully", user: { id: user._id, name: user.name, email: user.email, role: user.role, address: user.address, location: user.location, contactInfo: user.contactInfo } });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Log in for already Signed up users
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Fields are misssing" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "User Not Found" });
        }

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = signToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({ success: true, message: "Logged in successfully", user: { id: user._id, role: user.role, name: user.name } });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Logout for Logged in users
export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
    });

    res.json({ success: true, message: "Logged out successfully" });
};