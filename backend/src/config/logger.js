const { createLogger, format, transports } = require("winston");
const { MongoDB } = require("winston-mongodb");
const path = require("path");
const config = require("../config/config");
const util = require("util");
const { blue, red, yellow, magenta } = require("colorette");

// Define the log format for the console output
const consoleLogFormat = format.printf(
  ({ level, message, timestamp, meta }) => {
    const customLevel = colorizeLevel(level.toUpperCase());
    const customTimestamp = magenta(timestamp);
    const customMeta = meta
      ? util.inspect(meta, { colors: true, depth: null })
      : "{}";

    return `${customLevel}[${customTimestamp}] ${message}\n${magenta("META")}: ${customMeta}\n`;
  }
);

// Define the log format for the file output
const fileLogFormat = format.printf(({ level, message, timestamp, meta }) => {
  const logMeta = meta ? { ...meta } : {};
  for (const [key, value] of Object.entries(logMeta)) {
    if (value instanceof Error) {
      logMeta[key] = {
        name: value.name,
        message: value.message,
        trace: value.stack || "",
      };
    }
  }
  return JSON.stringify(
    {
      level: level.toUpperCase(),
      message,
      timestamp,
      meta: logMeta,
    },
    null,
    4
  );
});

// Define colorized level
const colorizeLevel = (level) => {
  switch (level) {
    case "ERROR":
      return red(level);
    case "INFO":
      return blue(level);
    case "WARN":
      return yellow(level);
    default:
      return level;
  }
};

// Create console transport
const createConsoleTransport = () =>
  new transports.Console({
    level: "info",
    format: format.combine(format.timestamp(), consoleLogFormat),
  });

// Create file transport
const createFileTransport = () =>
  new transports.File({
    filename: path.join(__dirname, "../", "../", "logs", `application.log`),
    level: "info",
    format: format.combine(format.timestamp(), fileLogFormat),
  });

// Create MongoDB transport
const createMongodbTransport = () => {
  if (!config.DATA_BASE) {
    console.error(colorette.red("DATABASE_URL is not defined"));
    return null;
  }

  try {
    return new MongoDB({
      level: "info",
      db: config.DATA_BASE,
      metaKey: "meta",
      expireAfterSeconds: 3600 * 24 * 30, // Expire logs after 30 days
      options: {
        useUnifiedTopology: true,
      },
      collection: "application-log",
    });
  } catch (error) {
    console.error(colorette.red("Error creating MongoDB transport:"), error);
    return null;
  }
};

// Create and export the logger instance
const logger = createLogger({
  defaultMeta: {
    meta: {}, // Default meta
  },
  transports: [
    createConsoleTransport(),
    createFileTransport(),
    createMongodbTransport(),
  ].filter(Boolean), // Remove null or undefined transports
});

// Debugging log to verify MongoDB transport
logger.info("Logger initialized and MongoDB transport configured");

module.exports = logger;
