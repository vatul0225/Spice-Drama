import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

/* ================= PLACE ORDER (COD) ================= */
const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.json({ success: false, message: "User not authenticated" });
    }

    const newOrder = new orderModel({
      userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      paymentMethod: "COD",
      payment: false,
      status: "Food Processing",
    });

    await newOrder.save();

    // clear user cart
    await userModel.findByIdAndUpdate(userId, {
      cartData: {},
    });

    res.json({
      success: true,
      message: "Order placed successfully (COD)",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("PLACE ORDER ERROR:", error);
    res.json({ success: false, message: "Order placement failed" });
  }
};

/* ================= USER ORDERS ================= */
const userOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });

    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("USER ORDERS ERROR:", error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

/* ================= ADMIN: ALL ORDERS ================= */
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("LIST ORDERS ERROR:", error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

/* ================= ADMIN: UPDATE STATUS ================= */
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });

    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    res.json({ success: false, message: "Error updating status" });
  }
};

export { placeOrder, userOrders, listOrders, updateStatus };
