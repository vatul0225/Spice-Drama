import foodModel from "../models/foodModel.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

/* ================= CLOUDINARY UPLOAD HELPER ================= */
const uploadToCloudinary = (fileBuffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "spice-drama" },
      (error, result) => {
        if (result?.secure_url) resolve(result.secure_url);
        else reject(error);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });

/* ================= ADD FOOD ================= */
const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !price || !category) {
      return res.json({ success: false, message: "Missing fields" });
    }

    if (!req.file) {
      return res.json({ success: false, message: "Image required" });
    }

    const imageUrl = await uploadToCloudinary(req.file.buffer);

    const food = await foodModel.create({
      name,
      description,
      price,
      category,
      image: imageUrl,
    });

    res.json({ success: true, data: food });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= LIST FOOD ================= */
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch {
    res.json({ success: false });
  }
};

/* ================= GET SINGLE FOOD ================= */
const getSingleFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }
    res.json({ success: true, data: food });
  } catch {
    res.json({ success: false });
  }
};

/* ================= REMOVE FOOD ================= */
const removeFood = async (req, res) => {
  try {
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true });
  } catch {
    res.json({ success: false });
  }
};

/* ================= UPDATE FOOD ================= */
const updateFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    if (!food) return res.json({ success: false });

    if (req.file) {
      food.image = await uploadToCloudinary(req.file.buffer);
    }

    food.name = req.body.name ?? food.name;
    food.description = req.body.description ?? food.description;
    food.category = req.body.category ?? food.category;
    food.price = req.body.price ?? food.price;

    await food.save();
    res.json({ success: true });
  } catch {
    res.json({ success: false });
  }
};

/* ================= EXPORTS (🔥 THIS WAS MISSING) ================= */
export {
  addFood,
  listFood,
  getSingleFood,
  removeFood,
  updateFood,
};
