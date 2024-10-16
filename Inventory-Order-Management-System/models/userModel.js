const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Each username must be unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Each email must be unique
  },
  password: {
    type: String,
    required: true, // Password is required
  },
  role_id: {
    type: String,
    default: "user", // Default role is 'user'
    enum: ["user", "admin"], // Allowed roles
  },
});

// Exporting the User model based on userSchema
module.exports = mongoose.model("User", userSchema);
