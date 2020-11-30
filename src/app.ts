import Debug from 'debug';
import express, { Application, NextFunction, Request, Response } from 'express';
import { router as authRouter }  from './controllers/auth.controller';
import { router as testRouter }  from './controllers/test.controller';
import { verifyToken } from './services/auth.service';
import { applyPreMiddleware, applyPostMiddleware } from './middleware/standard';
import http from 'http';

const debug: Debug.Debugger = Debug('app');
const port: string = process.env.PORT || '2000';

const server = () => {
  const app: Application = express();
  applyPreMiddleware(app);
  applyPostMiddleware(app);
  return http.createServer(app);
}

// ROUTES
// const authRoutes = authRouter();
// const testRoutes = testRouter();

// app.use('/auth', authRoutes);
// app.use('/testroute', verifyToken, testRoutes);

// app.get('/test', verifyToken, (req: Request, res: Response): void => {
//   res.send({ msg: 'Server online, GET request successful' });
// })
// ROUTES

server()
  .listen(port, () => {
    debug(`Server online, listening on port ${port}`)
  });