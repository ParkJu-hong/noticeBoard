import express, { Application, Request, Response } from 'express';
// const controllers = require('../controllers/index');
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { Text } from './entity/Text';
const cors = require('cors');

createConnection().then(async (connection) => {
    const userRepository = await connection.getRepository(User);
    const TextRepository = await connection.getRepository(Text);

    const app: Application = express();
    const port: number = 3000;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());

    // read
    app.get('/readtext', async (req: Request, res: Response)=>{
        const result = await TextRepository.find();
        console.log(result);
        res.status(200).json(result);
    });
    // create
    app.post('/writetext', async (req: Request, res: Response)=>{
        await TextRepository.insert({
            title: req.body.title,
            text: req.body.text
        })
        res.status(201).send("post success");
    });
    //delete
    app.get('/text/:id', async (req: Request, res: Response) => {
        await TextRepository.delete(req.params.id);
        res.send("200");
    })
    //update
    app.post('/updateText', async (req: Request, res: Response)=>{
        await TextRepository.save({
            id: req.body.id,
            title: req.body.title,
            text: req.body.text
        })
        res.status(201).send("post success");
    });
    app.listen(port, () => {
        console.log("서버실행")
    })

});