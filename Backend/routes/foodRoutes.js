import express from "express";
import multer from "multer";
import { isAuthenticated, hasRole } from "../middlewares/auth.js";
import {
  addFood,
  listFood,
  removeFood,
  getSingleFood,
  updateFood,
} from "../controllers/foodController.js";

const foodRouter = express.Router();

/* ✅ MEMORY STORAGE (Cloudinary ke liye) */
const upload = multer({ storage: multer.memoryStorage() });

/* ---------- ROUTES ---------- */

foodRouter.post(
  "/add",
  isAuthenticated,
  hasRole("admin", "super_admin"),
  upload.single("image"),
  addFood
);

foodRouter.put(
  "/update/:id",
  isAuthenticated,
  hasRole("admin", "super_admin"),
  upload.single("image"),
  updateFood
);

foodRouter.get("/list", isAuthenticated, listFood);
foodRouter.get("/single/:id", isAuthenticated, getSingleFood);

foodRouter.post(
  "/remove",
  isAuthenticated,
  hasRole("admin", "super_admin"),
  removeFood
);

/* ✅ THIS IS CRITICAL */
export default foodRouter;
