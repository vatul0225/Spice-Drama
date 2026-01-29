import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", isAuthenticated, addToCart);
cartRouter.post("/remove", isAuthenticated, removeFromCart);
cartRouter.post("/get", isAuthenticated, getCart);

export default cartRouter;
