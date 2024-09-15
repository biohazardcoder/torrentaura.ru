import mongoose from "mongoose";

const Product = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  console: { type: String, required: true },
  created: { type: Number, required: true },
  category: { type: String, required: true },
  company: { type: String, required: true },
  company: { type: String, required: true },
  system: { type: String, required: true },
  trailer: { type: String, required: true },
  like: { type: Number, default: 0 },
  file: { type: String, },
  photos: [{ type: String, required: true }],
});

export default mongoose.model("Product", Product);
