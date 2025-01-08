const winston = require("winston");

// Configure the logger
const logger = winston.createLogger({
  level: "info", // Default level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: "logs/error.log", level: "error" }), // Log errors
    new winston.transports.File({ filename: "logs/combined.log" }), // Log everything
  ],
});

// Middleware function for Express
const logRequest = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};

module.exports = { logger, logRequest };
