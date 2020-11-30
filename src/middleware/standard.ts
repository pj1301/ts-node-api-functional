import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import config from 'config';

const allowedOrigins = config.get("allowedOrigins");
const corsOpt = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin)) return callback(null, true);
        if (process.env.NODE_ENV === 'development' && !origin) return callback(null, true);
        return callback(new Error('Blocked by CORS policy'));
    }
};
const limiter = rateLimit({
    windowMs: 1*60*1000,
    max: 10
});

export function applyPreMiddleware(app: Application) {
    app
        .use(express.json())
        .use(cors(corsOpt))
        .use(morgan('dev'))
        .use(limiter)
}

export function applyPostMiddleware(app: Application) {
    app.use(helmet());
}