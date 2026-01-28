import foodModel from "../models/foodModel.js";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "spice_drama_foods",
        resource_type: "image",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
    uploadStream.end(fileBuffer);
  });
};

// Helper function to delete from Cloudinary
const deleteFromCloudinary = async (imageUrl) => {
  if (imageUrl && imageUrl.includes("cloudinary")) {
    const urlParts = imageUrl.split("/");
    const fileName = urlParts[urlParts.length - 1];
    const publicId = `spice_drama_foods/${fileName.split(".")[0]}`;
    await cloudinary.uploader.destroy(publicId);
  }
};

// ADD FOOD
const addFood = async (req, res) => {
  try {
    // Upload image buffer to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: result.secure_url, // Cloudinary URL
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

    // Delete from Cloudinary
    await deleteFromCloudinary(food.image);

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

    // If new image uploaded
    if (req.file) {
      // Delete old image
      await deleteFromCloudinary(food.image);

      // Upload new image
      const result = await uploadToCloudinary(req.file.buffer);
      food.image = result.secure_url;
    }

    // Update fields
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
