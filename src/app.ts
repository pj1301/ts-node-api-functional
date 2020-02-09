import cors from 'cors';
import Debug from 'debug';
import express, { Application, NextFunction, Request, Response } from 'express';
import { server } from './environment/environment';
import { router as authRouter }  from './controllers/auth.controller';
import { router as testRouter }  from './controllers/test.controller';
import { verifyToken } from './services/auth.service';

const debug: Debug.Debugger = Debug('app');
const app: Application = express();
const port: string = process.env.PORT || server.port;
const authRoutes = authRouter();
const testRoutes = testRouter();

app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/testroute', verifyToken, testRoutes);

app.get('/test', verifyToken, (req: Request, res: Response): void => {
  res.send({ msg: 'Server online, GET request successful' });
})

app.listen(port, () => debug(`Server online, listening on port ${port}`));