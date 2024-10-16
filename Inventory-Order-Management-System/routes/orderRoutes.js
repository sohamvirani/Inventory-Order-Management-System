const express = require("express");
const {
  placeOrder,
  getCustomerOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controller/orderController");
const { authenticate, IsAdmin } = require("../middleware/authenticate");
const router = express.Router();

// Customer routes: For placing an order and retrieving orders
router.post("/add", authenticate, placeOrder);
router.get("/my-orders", authenticate, getCustomerOrders);

// Admin routes: For viewing all orders and updating order status
router.get("/admin", authenticate, IsAdmin, getAllOrders);
router.put("/admin/:id", authenticate, IsAdmin, updateOrderStatus);

// Exporting the router to be used in other parts of the application
module.exports = router;
