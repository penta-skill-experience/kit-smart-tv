import * as express from "express";
import * as config from 'config';
import connect from './utils/conntectDb';

const port = config.get<number>('port');

const app = express();

app.listen(port, async () =>{
    console.log("this app is running! ");
    await connect();
});