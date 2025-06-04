"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default,
    params: async (req, file) => {
        return {
            folder: "products", // Folder in Cloudinary
            format: "png", // Default format (Cloudinary auto-detects actual format too)
            allowed_formats: ["jpg", "jpeg", "png"], // Custom prop, might be ignored
            public_id: file.originalname.split(".")[0], // Optional: name in Cloudinary
        };
    },
});
exports.upload = (0, multer_1.default)({ storage });
