const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware to authenticate user via token
exports.authenticate = async (req, res, next) => {
  try {
    const token = req.cookies["order"] || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied, token missing",
      });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedData.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication failure:", err.message);
    return res.status(401).json({
      success: false,
      message: "Token is invalid or expired",
    });
  }
};

// Middleware to authorize user role - User
exports.IsUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authorization required, user not authenticated",
    });
  }

  if (req.user.role_id === "user") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Access forbidden, insufficient privileges",
    });
  }
};

// Middleware to authorize user role - Admin
exports.IsAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authorization required, user not authenticated",
    });
  }

  if (req.user.role_id === "admin") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Access forbidden, insufficient privileges",
    });
  }
};
