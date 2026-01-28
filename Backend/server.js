import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;

// CORS Configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      process.env.FRONTEND_URL, // Add in Render env variables
    ],
    credentials: true,
  }),
);

app.use(express.json());

// Database Connection
connectDB();

// API Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// No need for static file serving anymore - Cloudinary handles it!

app.get("/", (req, res) => {
  res.send("API Working ✅ - Cloudinary Enabled");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
