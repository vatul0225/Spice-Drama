import express from "express";
import {
  addFood,
  listFood,
  removeFood,
  getSingleFood,
  updateFood,
} from "../controllers/foodController.js";

// ✅ Cloudinary upload middleware
import upload from "../middlewares/upload.js";

const foodRouter = express.Router();

/* ================= FOOD ROUTES ================= */

// ADD FOOD
foodRouter.post("/add", upload.single("image"), addFood);

// LIST FOOD
foodRouter.get("/list", listFood);

// REMOVE FOOD
foodRouter.post("/remove", removeFood);

// GET SINGLE FOOD (EDIT)
foodRouter.get("/single/:id", getSingleFood);

// UPDATE FOOD
foodRouter.put("/update/:id", upload.single("image"), updateFood);

export default foodRouter;
