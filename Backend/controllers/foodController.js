import foodModel from "../models/foodModel.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

/* upload helper */
const uploadToCloudinary = (fileBuffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "spice-drama" },
      (error, result) => {
        if (result) resolve(result.secure_url);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });

/* ADD FOOD */
export const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!req.file)
      return res.status(400).json({ success: false, message: "Image required" });

    const imageUrl = await uploadToCloudinary(req.file.buffer);

    const food = await foodModel.create({
      name,
      description,
      price,
      category,
      image: imageUrl, // ✅ FULL URL
    });

    res.json({ success: true, data: food });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* UPDATE FOOD */
export const updateFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    if (!food) return res.json({ success: false });

    if (req.file) {
      food.image = await uploadToCloudinary(req.file.buffer);
    }

    food.name = req.body.name;
    food.description = req.body.description;
    food.category = req.body.category;
    food.price = req.body.price;

    await food.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
