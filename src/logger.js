const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [new transports.Console(), new transports.File({ filename: 'logs/combined.log' })],
});

const logInfo = (message) => logger.info(message);
const logError = (message, error) => logger.error(`${message}: ${error}`);

module.exports = { logInfo, logError };
