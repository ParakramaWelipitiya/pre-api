const winston = require('winston');
const { combine, timestamp, printf, colorize } = winston.format;

// This logger ONLY uses the Console. 
// Vercel will automatically capture this and save it in your deployment logs.
const logger = winston.createLogger({
    level: 'info',
    format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        printf(({ level, message, timestamp }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console()
    ]
});

module.exports = logger;