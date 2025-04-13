const express = require("express");
const app = express();
const pages = require("./routes/pages"); 
const productRoutes = require("./routes/productRoutes"); 


app.set("view engine", "ejs");
app.set("views", __dirname + "/views");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.use("/", pages);            
app.use("/products", productRoutes);  


app.listen(3000, () => console.log("Server running on http://localhost:3000"));
