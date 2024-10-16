const Order = require('../models/orderModel');
const Product = require('../models/productModel');

// Customer places an order
exports.placeOrder = async (req, res) => {
  const { orderItems } = req.body;

  // Validate order items
  if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
    return res.status(400).json({ message: 'Order must contain items' });
  }

  try {
    // Calculate total cost
    let totalCost = 0;
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }
      totalCost += product.price * item.quantity;
    }

    // Create new order
    const newOrder = new Order({
      user: req.user._id,
      orderItems,
      totalPrice: totalCost,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Retrieve orders for authenticated customer
exports.getCustomerOrders = async (req, res) => {
  try {
    const userOrders = await Order.find({ user: req.user._id })
      .populate('orderItems.product', 'name price');
    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Admin retrieves all customer orders
exports.getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find()
      .populate('user', 'name email')
      .populate('orderItems.product', 'name price');
    res.json(allOrders);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Admin updates order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const orderToUpdate = await Order.findById(req.params.id);
    if (!orderToUpdate) {
      return res.status(404).json({ message: 'Order not found' });
    }

    orderToUpdate.status = req.body.status || orderToUpdate.status;
    await orderToUpdate.save();
    res.json({ message: 'Order status updated successfully', order: orderToUpdate });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
