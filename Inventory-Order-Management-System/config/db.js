const mongoose = require("mongoose").default;
require('dotenv').config();

// Connect to the MongoDB database
const db = mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("👍 Successfully connected to the database"))
  .catch(() => console.error("❌ Database connection failed"));

module.exports = db;
