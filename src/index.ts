import express, { Application } from 'express';
const controllers = require('../controllers/index');

const app: Application = express();
const port: number = 3000;

app.get('/', controllers.test);

app.listen(port, ()=>{
    console.log("서버실행")
})