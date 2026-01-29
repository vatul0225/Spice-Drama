import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    // ✅ Cloudinary image URL
    image: {
      type: String,
      required: true,
    },

    // ✅ Cloudinary public_id (important for delete/update)
    imageId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // ✅ future use (sorting, analytics)
  },
);

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
