const log4js = require("log4js");

log4js.configure({
  appenders: {
    console: { type: "console" },
    file: { type: "file", filename: "logs/requests.log" },
  },
  categories: {
    default: { appenders: ["console", "file"], level: "info" },
  },
});

const logger = log4js.getLogger();


exports.log4jLogger = (req, res, next) => {
  logger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}

