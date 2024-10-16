const Product = require("../models/productModel");

// Admin - Add a new product
exports.createProduct = async (req, res) => {
  const imageFile = req?.file?.filename;

  if (!imageFile) {
    return res.status(400).json({
      success: false,
      message: "Product image is required",
    });
  }

  const { name, price, description, stock, category } = req.body;
  try {
    const newProduct = new Product({
      name,
      price,
      description,
      image: imageFile,
      stock,
      category,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Public - Retrieve all products
exports.getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Public - Retrieve a product by its ID
exports.getProductById = async (req, res) => {
  try {
    const foundProduct = await Product.findById(req.params.id);
    if (!foundProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(foundProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Admin - Update a product
exports.updateProduct = async (req, res) => {
  const { name, price, description, image, stock, category } = req.body;

  try {
    const existingProduct = await Product.findById(req.params.id);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    existingProduct.name = name || existingProduct.name;
    existingProduct.price = price || existingProduct.price;
    existingProduct.description = description || existingProduct.description;
    existingProduct.image = image || existingProduct.image;
    existingProduct.stock = stock ?? existingProduct.stock;
    existingProduct.category = category || existingProduct.category;

    await existingProduct.save();
    res.json({ message: "Product updated successfully", product: existingProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Admin - Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const productToDelete = await Product.findById(req.params.id);

    if (!productToDelete) {
      return res.status(404).json({ message: "Product not found" });
    }

    await productToDelete.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message || "An unexpected error occurred",
    });
  }
};

// Admin - Check for products with low stock
exports.checkStock = async (req, res) => {
  try {
    const lowStockProducts = await Product.find({ stock: { $lt: 5 } });
    res.json({ message: "Low-stock products", products: lowStockProducts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
