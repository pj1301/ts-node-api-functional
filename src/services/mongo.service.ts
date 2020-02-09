import Debug from 'debug';
import { MongoClient } from 'mongodb';
import { server } from '../environment/environment';
import { IUser } from '../interfaces/user';

const debug: Debug.Debugger = Debug('app:mongo.service');
const mongodOpt = { useUnifiedTopology: true };
const { apiUrl } = server;

const findRecord = async (db: string, collection: string, query: any): Promise<any> => {
  const client = await MongoClient.connect(apiUrl, mongodOpt).catch(error => debug(error));
  if (!client) return { error: 'There was an error' };
  const result = await client.db(db).collection(collection).findOne(query);
  return result;
} 

const createRecord = async (db: string, collection: string, user: IUser): Promise<any> => {
  const client = await MongoClient.connect(apiUrl, mongodOpt).catch(error => debug(error));
  if (!client) return { error: 'There was an error' };
  const result = await client.db(db).collection(collection).insertOne(user)
  return result;
}

const getAllRecords = async (db: string, collection: string): Promise<any[]> => {
  const client = await MongoClient.connect(apiUrl, mongodOpt).catch(error => debug(error));
  if (!client) return [{ error: 'There was an error' }];
  const result = await client.db(db).collection(collection).find({}).toArray();
  return result;
}

export { findRecord, createRecord, getAllRecords };