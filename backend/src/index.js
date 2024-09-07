const app = require("./app");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const logger = require("./config/logger");
const colorette = require("colorette");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(colorette.green(`Server running on port ${PORT}`));
});
