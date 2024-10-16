const jwt = require("jsonwebtoken");

exports.generateTokenAndSetCookie = (userId, res) => {
  // Create the JWT token with a 15-day expiration
  const token = jwt.sign(
    { userId: userId },
    process.env.JWT_SECRET,
    { expiresIn: "15d" }
  );

  // Configure the cookie settings and attach the token
  res.cookie("order", token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000,  // 15 days in milliseconds
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict"
  });

  return token;
};
