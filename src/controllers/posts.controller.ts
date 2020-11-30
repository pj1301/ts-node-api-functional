import express, { NextFunction, Request, Response, Router } from 'express';
import { getAllRecords, createRecord, findRecord, deleteRecord } from '../services/mongo.service';
import config from 'config';
import { ObjectId } from 'mongodb';

const router: Router = express.Router();
const dbName: string = config.get("mongoDB.name");
const collection = 'posts';

export default (): Router => {

    router.route('/')
        .get(async(req: Request, res: Response, next: NextFunction) => {
            const posts = await getAllRecords(dbName, collection);
            res.status(200).send({posts});
        })
        .post(async(req: Request, res: Response, next: NextFunction) => {
            console.log(req.body);
            const result = await createRecord(dbName, collection, req.body);
            result ? res.status(200).send(result.ops[0]) : next(new Error('Create post failed'));
        })
        
    router.route('/:id')
        .get(async(req: Request, res: Response, next: NextFunction) => {
            const locator = { _id: new ObjectId(req.params.id) };
            const post = await findRecord(dbName, collection, locator);
            post ? res.status(200).send({post}) : next(new Error('Error retrieving post'))
        })
        .delete(async(req: Request, res: Response, next: NextFunction) => {
            const locator = { _id: new ObjectId(req.params.id) };
            deleteRecord(dbName, collection, locator);
            res.status(200).send({ msg: 'Post deleted' });
        })

    return router;
}
