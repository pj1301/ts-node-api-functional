import Debug from 'debug';
import express, { Application } from 'express';
import { applyPreMiddleware, applyPostMiddleware } from './middleware/standard';
import { applyRoutes } from './controllers/controller.module';
import http from 'http';

const debug: Debug.Debugger = Debug('app');
const port: string = process.env.PORT || '2000';

const server = () => {
  const app: Application = express();
  applyPreMiddleware(app);
  applyRoutes(app);
  applyPostMiddleware(app);
  return http.createServer(app);
}

server()
  .listen(port, () => {
    debug(`Server online, listening on port ${port}`)
  });