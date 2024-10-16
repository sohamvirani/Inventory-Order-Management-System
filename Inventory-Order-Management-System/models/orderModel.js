const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Links to the User model
    required: true,
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Links to the Product model
        required: true,
      },
      quantity: { 
        type: Number, 
        required: true 
      },
    },
  ],
  totalPrice: { 
    type: Number, 
    required: true 
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Shipped", "Delivered"],
  },
  orderDate: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model("Order", orderSchema);
