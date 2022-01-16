import * as express from "express";
import * as config from 'config';
import connect from './utils/conntectDb';
import logger from './utils/logger';
import routes from './routes'

const port = config.get<number>(`port`);

const app = express();

app.listen(port, async () =>{
    logger.info(`this app is running at http://localhost:${ port }`);
    await connect();
    routes(app);
});
