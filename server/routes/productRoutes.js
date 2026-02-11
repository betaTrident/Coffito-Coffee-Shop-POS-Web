import { Router } from "express";
import Product from "../models/Product.js";

const router = Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
});

// Get single product by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create new product
router.post("/", async (req, res) => {
  try {
    const { prod_name, prod_price, prod_category } = req.body;

    if (!prod_name || !prod_price || !prod_category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingProduct = await Product.findOne({ prod_name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product name already exists" });
    }

    const newProduct = new Product({ prod_name, prod_price, prod_category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating product", error: err.message });
  }
});

// Update existing product
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { prod_name, prod_price, prod_category } = req.body;

    if (typeof prod_name !== "string" || typeof prod_category !== "string" || isNaN(prod_price)) {
      return res.status(400).json({ message: "Invalid input types" });
    }

    const updateFields = {};
    if (prod_name) updateFields.prod_name = prod_name;
    if (prod_price) updateFields.prod_price = prod_price;
    if (prod_category) updateFields.prod_category = prod_category;

    const updatedProduct = await Product.findByIdAndUpdate(id, { $set: updateFields }, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
});

export default router;
