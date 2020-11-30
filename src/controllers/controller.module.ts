import { Application, Request, Response } from 'express';
import AuthRouter from './auth.controller';
import TestRouter from './test.controller';
import { verifyToken } from '../services/auth.service';

export function applyRoutes(app: Application) {
    app.use('/api/v1/auth', AuthRouter());
    app.use('/api/v1/testroute', verifyToken, TestRouter());

    app.get('/api/v1/test', verifyToken, (req: Request, res: Response): void => {
        res.send({ msg: 'Server online, GET request successful' });
    })
}