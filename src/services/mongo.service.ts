import Debug from 'debug';
import { MongoClient } from 'mongodb';
import config from 'config';

const debug: Debug.Debugger = Debug('app:mongo.service');
const mongodOpt = { useUnifiedTopology: true };
const mongoUrl = config.get("mongoDB.url");

const findRecord = async (db: string, collection: string, query: any): Promise<any> => {
  const client = await MongoClient.connect(mongoUrl, mongodOpt).catch(error => debug(error));
  if (!client) return { error: 'There was an error' };
  const result = await client.db(db).collection(collection).findOne(query);
  return result;
} 

const createRecord = async (db: string, collection: string, data: any): Promise<any> => {
  const client = await MongoClient.connect(mongoUrl, mongodOpt).catch(error => debug(error));
  if (!client) return { error: 'There was an error' };
  const result = await client.db(db).collection(collection).insertOne(data)
  return result;
}

const getAllRecords = async (db: string, collection: string): Promise<any[]> => {
  const client = await MongoClient.connect(mongoUrl, mongodOpt).catch(error => debug(error));
  if (!client) return [{ error: 'There was an error' }];
  const result = await client.db(db).collection(collection).find({}).toArray();
  return result;
}

export { findRecord, createRecord, getAllRecords };