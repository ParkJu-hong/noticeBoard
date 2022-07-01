import { Request, Response } from 'express';

module.exports = {
    test: (req:Request, res:Response) => {
        res.status(200).send('Hello world');
    }
}