import Debug from 'debug';
import express, { Router, Request, Response, NextFunction } from 'express';
import { findRecord, createRecord } from '../services/mongo.service';
import { encrypt, decrypt } from '../services/encryption.service';
import { generateToken } from '../services/jwt.service';
import config from 'config';

const debug: Debug.Debugger = Debug('app:auth.controller');
const dbName: string = config.get("mongoDB.name");
const userCollection = "users";
const authRoutes: Router = express.Router();

export default (): Router => {

  authRoutes.route('/register')
    .post(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      const { username, password } = req.body;
      const user = await findRecord(dbName, userCollection, { username });
      if (user) {
        next(new Error('User exists, please sign in'));
        return;
      }
      const encryptedPw = await encrypt(password);
      if (!encryptedPw) {
        next(new Error('An error occurred whilst encrypting the password'));
        return;
      }
      const newUser = { username, password: encryptedPw };
      const dbRecord = await createRecord(dbName, userCollection, newUser);
      dbRecord ? res.status(200).send(dbRecord) : next(new Error('Registration Failed'));
    })

  authRoutes.route('/login')
    .post(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      const { username, password } = req.body;
      const userRecord = await findRecord(dbName, userCollection, { username });
      if (!userRecord) {
        next(new Error('User credentials incorrect'));
        return;
      }
      if (!await decrypt(password, userRecord.password)) {
        next(new Error('User credentials incorrect'));
        return;
      }
      const token = await generateToken(userRecord._id.toHexString());
      token ? res.status(200).send({token}) : next(new Error('Login failed'));
    })

  return authRoutes;
}
