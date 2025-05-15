import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "products", // Folder in Cloudinary
      format: "png", // Default format (Cloudinary auto-detects actual format too)
      allowed_formats: ["jpg", "jpeg", "png"], // Custom prop, might be ignored
      public_id: file.originalname.split(".")[0], // Optional: name in Cloudinary
    };
  },
});

export const upload = multer({ storage });
