import express from "express";
import multer from "multer";
import {
  addFood,
  listFood,
  removeFood,
  getSingleFood,
  updateFood,
} from "../controllers/foodController.js";

const foodRouter = express.Router();

// Temporary memory storage (file buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.get("/single/:id", getSingleFood);
foodRouter.put("/update/:id", upload.single("image"), updateFood);

export default foodRouter;
