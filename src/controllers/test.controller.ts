import Debug from 'debug';
import express, { Router, Request, Response } from 'express';

const debug: Debug.Debugger = Debug('app:auth.controller');
const testRoutes: Router = express.Router();

const router = (): Router => {

  testRoutes.route('/')
   .get((req: Request, res: Response): void => {
     res.send({ msg: 'Server online, Testroutes GET working' });
   })
   .post((req: Request, res: Response): void => {
    res.send({ msg: 'Server online, Testroutes POST working', data: req.body })
  })

   return testRoutes;
}

export { router };