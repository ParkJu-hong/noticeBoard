import { Request, Response } from 'express';
import { User } from "../src/entity/User";
import { Text } from '../src/entity/Text';
import {getConnection, createConnection} from "typeorm";

module.exports = {
    test: async (req: Request, res: Response, repository: any) => {
        const result = getConnection().getRepository(User).find();
        console.log("repository : ", repository);
        res.status(200).json(result);
    },
    writeText: async (req: Request, res: Response) => {
        await createConnection().then((connection) => {
            const textRepository = connection.getRepository(Text);
            textRepository.insert({
                id: 1,
                title: "제목",
                text: "로엠 글"
            })
        })
        res.status(200).send("sucesss");
    },
    readText: async (req: Request, res: Response) => {
        await createConnection().then((connection) => {
            const textRepository = connection.getRepository(Text);
            textRepository.find().then((data) => {
                res.status(200).json(data);
            })
        })
    }
}