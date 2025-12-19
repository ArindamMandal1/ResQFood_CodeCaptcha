import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params : {
        folder : "ResQFood_cc_images",
        allowed_formats : ["jpg", "jpeg", "png"],
        transformation : [{ width : 1200, height : 900, crop : "limit"}],
    },
});

// Create a storage
const parser = multer({ storage, 
    limits : { fileSize : 5 * 1024 * 1024 },  // 5 MB max
    fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPG, JPEG, PNG files are allowed"));
    }
    cb(null, true);
  }, 
}); 

export default parser;