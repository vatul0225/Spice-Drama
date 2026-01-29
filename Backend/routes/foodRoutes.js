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

/* MULTER (MEMORY STORAGE) */
const upload = multer({
  storage: multer.memoryStorage(),
});

/* ROUTES */

// ✅ ADD FOOD (ADMIN)
foodRouter.post(
  "/add",
  upload.single("image"),
  addFood
);

// ✅ LIST FOOD (ADMIN PANEL)
foodRouter.get("/list", listFood);

// ✅ REMOVE FOOD
foodRouter.post("/remove", removeFood);

// ✅ GET SINGLE FOOD
foodRouter.get("/single/:id", getSingleFood);

// ✅ UPDATE FOOD
foodRouter.put(
  "/update/:id",
  upload.single("image"),
  updateFood
);

export default foodRouter;
