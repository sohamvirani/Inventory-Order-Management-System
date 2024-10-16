const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  checkStock,
  getProducts,
  getProductById,
} = require("../controller/productController");
const { authenticate, IsAdmin } = require("../middleware/authenticate");
const upload = require("../util/fileUpload");

const router = express.Router();

// Public Routes: Retrieve products
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin Routes: Manage product creation, updates, and deletion
router.post("/add", upload.single("image"), authenticate, IsAdmin, createProduct);
router.put("/:id", upload.single("image"), authenticate, IsAdmin, updateProduct);
router.delete("/:id", authenticate, IsAdmin, deleteProduct);

// Admin Route: Inventory management for low-stock products
router.get("/inventory/low-stock", authenticate, IsAdmin, checkStock);

// Exporting the router for use in the application
module.exports = router;
