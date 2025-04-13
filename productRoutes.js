const express = require("express");
const router = express.Router();
const productModel = require("../product-app/product");


router.get("/", async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Error fetching products" });
  }
});


router.post("/", async (req, res) => {
  const { name, image, description, price } = req.body;
  try {
    const id = await productModel.addProduct({ name, image, description, price });
    res.status(201).json({ message: "Product added", id });
  } catch (err) {
    res.status(500).json({ error: "Error adding product" });
  }
});

module.exports = router;
