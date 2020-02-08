import Debug from 'debug';
import express, { Router, Request, Response } from 'express';

const debug: Debug.Debugger = Debug('app:auth.controller');
const authRoutes: Router = express.Router();

const router = (): Router => {

  authRoutes.route('/')
   .get((req: Request, res: Response) => {
     res.send({ msg: 'Server online, Authroutes GET working' });
   })
   .post((req: Request, res: Response) => {
     res.send({ msg: 'Server online, Authroutes POST working', data: req.body })
   })

   return authRoutes;
}

export { router };