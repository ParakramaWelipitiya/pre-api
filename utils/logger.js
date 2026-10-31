const winston = require('winston');

const { combine, timestamp, printf, colorize, json } = winston.format;

// Format for the terminal (readable)
const consoleFormat = combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    printf(({ level, message, timestamp }) => {
        return `[${timestamp}] ${level}: ${message}`;
    })
);

// Format for the log files (JSON for easy machine parsing later)
const fileFormat = combine(
    timestamp(),
    json()
);

const logger = winston.createLogger({
    level: 'info',
    transports: [
        // Write all logs with level 'error' and below to error.log
        new winston.transports.File({ filename: 'logs/error.log', level: 'error', format: fileFormat }),
        // Write all logs to combined.log
        new winston.transports.File({ filename: 'logs/combined.log', format: fileFormat })
    ]
});

// If we are not in production, also print to the console
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: consoleFormat
    }));
}

module.exports = logger;