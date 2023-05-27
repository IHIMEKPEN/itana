import { createLogger, format, transports } from 'winston';
import { ENVIRONMENT } from '../configs';

/** Custom Info Object Formatter */
const defaultFormat = format.printf(({ level, message, timestamp }): string => {
  return `${timestamp} ${level}: ${message}`;
});

/** Custom Timestamp formatter */
const timestampFormatter = format.timestamp({
  format: () => {
    return `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
  },
});

/** Custom Formatter Combined */
const fileFormat = format.combine(defaultFormat, timestampFormatter, format.json());

/** Logger */
const logger = createLogger({
  level: 'info',
  transports: [new transports.File({ filename: 'error.log', level: 'error', format: fileFormat })],
});

/** Print on console if in development mode */
if (ENVIRONMENT !== 'production') {
  logger.add(new transports.Console({ format: format.combine(format.colorize(), format.simple()) }));
}

export { logger };
