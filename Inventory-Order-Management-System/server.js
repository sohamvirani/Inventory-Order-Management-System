const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// Load environment variables
require("dotenv").config();
require("./config/db"); // Database connection

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cookie-parser')());
app.use('/uploads', express.static('uploads'));

// Route imports
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

// API routes
app.use("/api/v1", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);

// Home route
app.get("/", (req, res) => {
    res.send(
        `<center>
            <h1>Inventory and Order Management System</h1>
            <br>
            Get Recipe Api 
            <a href="https://github.com/sohamvirani/Inventory-Order-Management-System" target="_blank">Repository : Inventory and Order Management System</a>
        </center>`
    );
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
