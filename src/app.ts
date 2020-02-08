import cors from 'cors';
import Debug from 'debug';
import express, { Application, NextFunction, Request, Response } from 'express';
import { server } from './environment/environment';
import { router as authRouter }  from './controllers/auth.controller';
import { router as testRouter }  from './controllers/test.controller';

const debug: Debug.Debugger = Debug('app');
const app: Application = express();
const port: string = process.env.PORT || server.port;
const authRoutes = authRouter();
const testRoutes = testRouter();

app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/test', testRoutes);

app.get('/test', (req: Request, res: Response) => {
  res.send({ msg: 'Server online, GET request successful' });
})

app.listen(port, () => debug(`Server online, listening on port ${port}`));