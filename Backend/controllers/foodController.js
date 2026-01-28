import foodModel from "../models/foodModel.js";
import { v2 as cloudinary } from "cloudinary";

// ADD FOOD
const addFood = async (req, res) => {
  try {
    // req.file.path contains full Cloudinary URL
    let image_url = req.file.path;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_url, // Store full Cloudinary URL
    });

    await food.save();
    res.json({ success: true, message: "Food added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding food" });
  }
};

// LIST FOOD
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching foods" });
  }
};

// REMOVE FOOD
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    // Delete image from Cloudinary
    if (food.image && food.image.includes("cloudinary")) {
      // Extract public_id from URL
      const urlParts = food.image.split("/");
      const fileName = urlParts[urlParts.length - 1];
      const publicId = `spice_drama_foods/${fileName.split(".")[0]}`;

      await cloudinary.uploader.destroy(publicId);
    }

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing food" });
  }
};

// GET SINGLE FOOD
const getSingleFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    res.json({ success: true, data: food });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching food" });
  }
};

// UPDATE FOOD
const updateFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);

    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }

    // If new image uploaded, delete old from Cloudinary
    if (req.file) {
      if (food.image && food.image.includes("cloudinary")) {
        const urlParts = food.image.split("/");
        const fileName = urlParts[urlParts.length - 1];
        const publicId = `spice_drama_foods/${fileName.split(".")[0]}`;

        await cloudinary.uploader.destroy(publicId);
      }
      food.image = req.file.path; // New Cloudinary URL
    }

    // Update other fields
    food.name = req.body.name;
    food.description = req.body.description;
    food.category = req.body.category;
    food.price = req.body.price;

    await food.save();

    res.json({ success: true, message: "Food updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating food" });
  }
};

export { addFood, listFood, removeFood, getSingleFood, updateFood };
