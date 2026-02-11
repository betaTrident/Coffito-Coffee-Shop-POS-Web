import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    prod_name: { type: String, required: true, unique: true },
    prod_price: { type: Number, required: true },
    prod_category: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
