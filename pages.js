const express = require("express");
const router = express.Router();
const productModel = require("../product-app/product"); 


router.get("/product", async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.render("product", { title: "Products", products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Error fetching products");
    }
});

// Add 
router.post("/product/add", async (req, res) => {
    const { name, image, description, price } = req.body;

    if (!name || !image || !description || !price) {
        return res.status(400).send("All fields are required.");
    }

    try {
        await productModel.addProduct({ name, image, description, price });
        res.redirect("/product");
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).send("Error adding product");
    }
});

// Delete 
router.post("/product/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await productModel.deleteProduct(id);
        res.redirect("/product");
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("Error deleting product");
    }
});


router.get("/product/edit/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const product = await productModel.getProductById(id);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.render("edit", { title: "Edit Product", product });
    } catch (error) {
        console.error("Error fetching product to edit:", error);
        res.status(500).send("Error fetching product for edit");
    }
});


router.post("/product/edit/:id", async (req, res) => {
    const { id } = req.params;
    const { name, image, description, price } = req.body;

    if (!name || !image || !description || !price) {
        return res.status(400).send("All fields are required.");
    }

    try {
        await productModel.updateProduct(id, { name, image, description, price });
        res.redirect("/product");
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send("Error updating product");
    }
});


router.get("/", (req, res) => res.render("home", { title: "Home" }));
router.get("/about", (req, res) => res.render("about", { title: "About Us" }));
router.get("/contact", (req, res) => res.render("contact", { title: "Contact" }));
router.get("/blog", (req, res) => res.render("blog", { title: "Blog" }));
router.get("/shop", (req, res) => res.render("shop", { title: "Shop or Gallery" }));
router.get("/subscribe", (req, res) => res.render("subscribe", { title: "Subscribe" }));
router.get("/services", (req, res) => res.render("services", { assetsPath: "public", title: "Services" }));

module.exports = router;


