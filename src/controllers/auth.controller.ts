import Debug from 'debug';
import express, { Router, Request, Response } from 'express';
import { findRecord, createRecord } from '../services/mongo.service';
import { encrypt, decrypt } from '../services/encryption.service';
import { generateToken, deciferToken } from '../services/jwt.service';
import config from 'config';

const debug: Debug.Debugger = Debug('app:auth.controller');
const dbName = config.get("mongoDB.name");
const userCollection = "users";
const authRoutes: Router = express.Router();

const router = (): Router => {

  authRoutes.route('/register')
    .post(async (req: Request, res: Response): Promise<any> => {
      const { username, password } = req.body;
      const user = await findRecord(dbName, userCollection, { username });
      if (user) return res.send('User exists, please sign in');
      const encryptedPw = await encrypt(password);
      if (!encryptedPw) return res.send('An error occurred whilst encrypting the password');
      const newUser = { username, password: encryptedPw };
      const dbRecord = await createRecord(dbName, userCollection, newUser);
      res.send(dbRecord ?? 'An error occurred');
    })

  authRoutes.route('/login')
    .post(async (req: Request, res: Response): Promise<any> => {
      const { username, password } = req.body;
      const userRecord = await findRecord(dbName, userCollection, { username });
      if (!userRecord) return res.send('User credentials incorrect');
      if (!await decrypt(password, userRecord.password)) return res.send('User credentials incorrect');
      const token = await generateToken(userRecord._id.toHexString());
      res.send(token);
    })

  return authRoutes;
}

export { router };