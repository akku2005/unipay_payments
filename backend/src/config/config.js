// require("dotenv").config(); // Ensure dotenv is configured here

// const config = {
//   db: process.env.MONGO_URI,
// };

// module.exports = config;

const dotenvFlow = require("dotenv-flow");
dotenvFlow.config(); // Load environment variables

const config = {
  PORT: process.env.PORT,
  SERVER_URL: process.env.SERVER_URL,
  DATA_BASE: process.env.MONGO_URI,
};

console.log("Config:", config); // Debugging

module.exports = config;
