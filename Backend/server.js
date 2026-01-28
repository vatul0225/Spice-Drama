import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ CORS FIX - Add your Vercel URL
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://your-vercel-app.vercel.app", // 👈 Change this
    ],
    credentials: true,
  }),
);

app.use(express.json());

// ✅ Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("✅ Uploads folder created at:", uploadsDir);
}

// DB Connection
connectDB();

// ✅ API Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// ✅ Serve static files - MUST be after API routes
app.use("/images", express.static(uploadsDir));

// ✅ Debug route
app.get("/debug/uploads", (req, res) => {
  try {
    const files = fs.existsSync(uploadsDir) ? fs.readdirSync(uploadsDir) : [];
    res.json({
      uploadsPath: uploadsDir,
      exists: fs.existsSync(uploadsDir),
      files: files,
      count: files.length,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("API Working ✅");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Uploads: ${uploadsDir}`);
});
