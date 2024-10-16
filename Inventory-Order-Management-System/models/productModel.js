const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  description: { 
    type: String 
  },
  image: { 
    type: String, 
    required: true // This field must be filled out
  },
  stock: { 
    type: Number, 
    required: true, 
    default: 0 
  },
  category: { 
    type: String, 
    required: true 
  },
});

// Method to check if the stock is low
productSchema.methods.isStockLow = function () {
  return this.stock < 5; // Set the threshold for low stock
};

module.exports = mongoose.model("Product", productSchema);
