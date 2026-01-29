import express from "express";
import {
  listOrders,
  placeOrder,
  updateStatus,
  userOrders,
} from "../controllers/orderController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const orderRouter = express.Router();

// ✅ PLACE ORDER (USER ONLY)
orderRouter.post("/place", isAuthenticated, placeOrder);

// ✅ USER ORDERS (USER ONLY)
orderRouter.post("/userorders", isAuthenticated, userOrders);

// ✅ ADMIN ORDERS (NO AUTH)
orderRouter.get("/list", listOrders);

// ✅ UPDATE STATUS (ADMIN)
orderRouter.post("/status", updateStatus);

export default orderRouter;
