const { RateLimiterMongo } = require("rate-limiter-flexible");
const mongoose = require("mongoose");
const config = require("../config/config");
const colorette = require("colorette");

// Check if MONGO_URI is defined
if (!config.DATA_BASE) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

// Configure MongoDB connection
mongoose
  .connect(config.DATA_BASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(colorette.green("MongoDB connected for rate limiter"))
  )
  .catch((err) => {
    console.error(colorette.red("MongoDB connection error:"), err);
    process.exit(1);
  });

// Define the rate limiter
const rateLimiter = new RateLimiterMongo({
  storeClient: mongoose.connection, // Use the Mongoose connection as the MongoDB client
  points: 10, // Number of points
  duration: 100 * 60, // Per 15 minutes
  keyPrefix: "rateLimiter",
  // Additional configuration can be added here if needed
});

const rateLimiterMiddleware = async (req, res, next) => {
  const ip = req.ip; // Use IP address as the key

  try {
    await rateLimiter.consume(ip); // Consume one point
    next(); // Allow request to proceed
  } catch (rlRejected) {
    res.status(429).json({
      message:
        "Too many requests from this IP, please try again after 15 minutes.",
    });
  }
};

module.exports = rateLimiterMiddleware;
