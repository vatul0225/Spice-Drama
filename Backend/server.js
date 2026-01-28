import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// app config
const app = express();
// const port = 4000;
const PORT = process.env.PORT || 4000; // port for live host on render

// middleware
app.use(express.json());
app.use(cors());

// Db Connection
connectDB();

// api endpoint
app.use("/api/food", foodRouter);
// Serve static images - use absolute path for Vercel compatibility
app.use("/images", express.static(path.join(__dirname, "uploads")));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// app.listen(port, () => {
//   console.log(`Server started on http://localhost:${port}`);
// });

// for render live host
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
