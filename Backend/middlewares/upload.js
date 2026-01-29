import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import pkg from "multer-storage-cloudinary";

// ✅ Node 22 + ESM compatible access
const { CloudinaryStorage } = pkg.default;

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "food-items",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

export default upload;
