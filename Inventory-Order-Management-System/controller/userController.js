const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateTokenAndSetCookie } = require("../config/auth");

// Signup handler for new users
exports.signup = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Email format is invalid",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password should be at least 6 characters",
    });
  }

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username is taken",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = new User({
      email,
      password: hashedPassword,
      username,
    });

    await createdUser.save();
    generateTokenAndSetCookie(createdUser._id, res);

    res.status(201).json({
      success: true,
      user: {
        id: createdUser._id,
        email: createdUser.email,
        username: createdUser.username,
      },
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Login handler for users
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Both email and password are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      success: true,
      message: "Login successful!",
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Logout handler to clear session
exports.logout = async (req, res) => {
  try {
    res.clearCookie("order");
    res.status(200).json({
      success: true,
      message: "Successfully logged out",
    });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
