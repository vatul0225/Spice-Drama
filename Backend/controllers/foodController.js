import foodModel from "../models/foodModel.js";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../middlewares/upload.js";

/* ================= ADD FOOD ================= */
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ success: false, message: "Image is required" });
    }

    // upload image buffer to cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,

      // Cloudinary data
      image: result.secure_url,
      imageId: result.public_id,
    });

    await food.save();

    res.json({ success: true, message: "Food added successfully" });
  } catch (error) {
    console.error("ADD FOOD ERROR:", error);
    res.json({ success: false, message: "Error adding food" });
  }
};

/* ================= LIST FOOD ================= */
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error("LIST FOOD ERROR:", error);
    res.json({ success: false, message: "Error fetching foods" });
  }
};

/* ================= REMOVE FOOD ================= */
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }

    // delete image from cloudinary
    await cloudinary.uploader.destroy(food.imageId);

    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food removed successfully" });
  } catch (error) {
    console.error("REMOVE FOOD ERROR:", error);
    res.json({ success: false, message: "Error removing food" });
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
  } catch (error) {
    console.error("GET SINGLE FOOD ERROR:", error);
    res.json({ success: false, message: "Error fetching food" });
  }
};

/* ================= UPDATE FOOD ================= */
const updateFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);

    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }

    // if new image uploaded
    if (req.file) {
      // delete old image
      await cloudinary.uploader.destroy(food.imageId);

      // upload new image
      const result = await uploadToCloudinary(req.file.buffer);

      food.image = result.secure_url;
      food.imageId = result.public_id;
    }

    // update fields
    food.name = req.body.name;
    food.description = req.body.description;
    food.category = req.body.category;
    food.price = req.body.price;

    await food.save();

    res.json({ success: true, message: "Food updated successfully" });
  } catch (error) {
    console.error("UPDATE FOOD ERROR:", error);
    res.json({ success: false, message: "Error updating food" });
  }
};

export { addFood, listFood, removeFood, getSingleFood, updateFood };
