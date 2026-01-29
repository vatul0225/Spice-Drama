import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  listOrders,
  placeOrder,
  updateStatus,
  userOrders,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// PLACE ORDER
orderRouter.post("/place", isAuthenticated, placeOrder);

// USER ORDERS
orderRouter.post("/userorders", isAuthenticated, userOrders);

// ADMIN ORDERS
orderRouter.get("/list", isAuthenticated, listOrders);

// UPDATE STATUS
orderRouter.post("/status", isAuthenticated, updateStatus);

export default orderRouter;
