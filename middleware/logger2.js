const winston = require("winston");
const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `[${timestamp}][${level}] ${message}`;
});

// Create a Winston logger instance
const logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), customFormat),
  transports: [new winston.transports.Console()],
});

// Custom middleware function to log requests and responses
exports.requestLoggerMiddleware = (req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);

  res.on("finish", () => {
    logger.info(`Response: ${res.statusCode}`);
  });

  next();
};


