import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import {
  addFood,
  listFood,
  removeFood,
  getSingleFood,
  updateFood,
} from "../controllers/foodController.js";

const foodRouter = express.Router();

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Image store engine - use absolute path for Vercel compatibility
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

// GET SINGLE FOOD (FOR EDIT)
foodRouter.get("/single/:id", getSingleFood);

// UPDATE FOOD (EDIT MODE)
foodRouter.put("/update/:id", upload.single("image"), updateFood);

export default foodRouter;
