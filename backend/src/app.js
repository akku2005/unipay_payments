const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const apiLimiter = require("./middlewares/rateLimiter");
const errorHandler = require("./middlewares/errorMiddleware");
const authMiddleware = require("./middlewares/authMiddleware");
const connectDB = require("./config/db");
const paymentRoutes = require("./routes/paymentRoutes");
const razorpayRoutes = require("./routes/razorpayRoutesFetchOrder");

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Global Middlewares
app.use(helmet()); // Security headers
app.use(express.json({ limit: "10kb" })); // Limit body size
app.use(cookieParser());
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Prevent XSS attacks
app.use(hpp()); // Prevent HTTP parameter pollution

// Enable CORS with secure configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Allow requests only from your frontend URL
    credentials: true, // Allow cookies to be sent
  })
);

// Apply rate limiter to all requests
app.use(apiLimiter);

// Mount Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/payments", paymentRoutes);
// Fetch razorpay orders
app.use("/api/razorpay", razorpayRoutes);

// Example of a protected route
app.use("/api/protected", authMiddleware, (req, res) => {
  res.status(200).json({ msg: "This is a protected route", user: req.user });
});

// Handle undefined routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Global Error handling middleware
app.use(errorHandler);

module.exports = app;
