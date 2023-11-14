import { createLogger, format, transports } from 'winston'
import { is_development } from './config.js';

// Check if the environment is development
const isDevelopment = is_development;

// Define log levels and colors
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
  },
};

// Create the logger
const logger = createLogger({
  levels: customLevels.levels,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    // Log to the console only in development
    isDevelopment ? new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
      ),
    }) : null,
    // Log to a file in all environments
    new transports.File({
      filename: 'loggers/error.log',
      level: 'error',
    }),

    new transports.File({
      filename: 'loggers/info.log',
      level: 'info'
    }),
    
    new transports.File({
      filename: 'loggers/combined.log',
    }),
  ].filter(Boolean), // Filter out null transports in case of non-development environment
});


export default logger;
