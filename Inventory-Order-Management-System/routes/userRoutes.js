const express = require("express");
const { signup, login, logout } = require("../controller/userController");

const userRouter = express.Router();

// User Authentication Routes
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

// Exporting the router for application use
module.exports = userRouter;
