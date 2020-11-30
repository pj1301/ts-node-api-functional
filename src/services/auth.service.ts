import Debug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { deciferToken } from '../services/jwt.service';
import { getAllRecords } from '../services/mongo.service';
import config from 'config';

const debug = Debug('app:auth.service');
const dbName = config.get("mongoDB.name");
const userCollection = "users";

const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const header = req.get('Authorization');
  if (!header) return res.send('No token provided');
  const { id } = deciferToken(header);
  const allUsers = await getAllRecords(dbName, userCollection);
  if (allUsers[0].error) return res.send('An error occurred');
  const ids = allUsers.map(user => user._id.toHexString());
  if (ids.includes(id)) return next(); 
  res.send('Token invalid');
}

export { verifyToken };
