require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const logger = require('./utils/logger'); // Import your new logger

const app = express();

// 1. Security Headers
app.use(helmet());

// 2. CORS Setup
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// 3. Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api', limiter); 

// 4. JSON Parser
app.use(express.json());

// 5. HTTP Request Logging (Morgan intercepts the request and sends it to Winston)
const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(morganFormat, {
    stream: { write: (message) => logger.info(message.trim()) }
}));

// 6. Base Route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'pre-api is running securely!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    // Replaced console.log with our structured logger
    logger.info(`Production-ready API listening on port ${PORT}`);
});