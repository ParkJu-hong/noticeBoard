import express, { Application, Request, Response } from 'express';
// const controllers = require('../controllers/index');
import "reflect-metadata";
import { createConnection } from "typeorm";

import session from 'express-session';
import passport from 'passport';
const passportConfig = require('./passport');

const cookieParser = require('cookie-parser');

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
    app.use(session({ 
        secret: 'dqwwdqddwq',
        resave: true,
        saveUninitialized: false,
        
    })); // 세션 활성화
    app.use(cookieParser())
    app.use(passport.initialize()); // passport 구동
    app.use(passport.session()); // 세션 연결
    passportConfig(userRepository);

    // login
    app.post('/login', passport.authenticate('local', {
        failureRedirect: 'http://localhost:3001/Login'
    }), (req, res) => {
        res.redirect('http://localhost:3001/');
    })

    // join
    app.post('/join', async (req: Request, res: Response) => {
        const result = await userRepository.findOne({
            where: {
                userId: req.body.id
            }
        })
        if(!result){
            return res.json({ message : "존재하는 아이디입니다"})
        }

        await userRepository.insert({ pw : req.body.pw, userId: req.body.id});
        res.json({ message : "회원가입 되었습니다."})
    })

    app.get('/test', (req: Request, res: Response) => {
        req.session.destroy(()=>{});
        return res.redirect('/readtext');
        // console.log(req.user)
        // res.writeHead(200, {
        //     'Set-Cookie': ['yummy-cookie=choco', 'tasty-cookie=strawberry']
        // });
        // return res.json({ message : "fail login"});
    })

    app.get("/secrets", function (req, res) {
        console.log(req.isAuthenticated());
        if (!req.isAuthenticated()) {
          res.redirect("https://www.naver.com");
        } else {
          res.redirect('http://localhost:3001/Login');
        }
      });

    app.get('/faillogin', async (req: Request, res: Response) => {
        res.status(200).json({ message : "fail login"});
    });

    // read
    app.get('/readtext', async (req: Request, res: Response) => {
        const result = await TextRepository.find();
        res.status(200).json(result);
    });
    // create
    app.post('/writetext', async (req: Request, res: Response) => {
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
    app.post('/updateText', async (req: Request, res: Response) => {
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