import multer from "multer";
import cloudinary from "../config/cloudinary.js";

/* ================= MULTER MEMORY STORAGE ================= */
const storage = multer.memoryStorage();

const upload = multer({ storage });

/* ================= CLOUDINARY UPLOAD HELPER ================= */
export const uploadToCloudinary = (buffer, folder = "food-items") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    stream.end(buffer);
  });
};

export default upload;
