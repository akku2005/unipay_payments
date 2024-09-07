// Database connection configuration
// config/db.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("../config/logger"); // Import the logger
const colorette = require("colorette");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info(colorette.green("MongoDB Connected..."));
  } catch (error) {
    logger.error(colorette.red("MongoDB connection error:"), {
      error: error.message,
    });
    process.exit(1);
  }
};

module.exports = connectDB;
