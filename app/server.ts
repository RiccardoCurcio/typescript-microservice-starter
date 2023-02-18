import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import expressLogger from '@/logger/ExpressLogger';
import logger from '@/logger/Logger';
import routes from '@/routes/Routes';
import MemcachedConnection from '@/memcached/MemcachedConnection';


const serverIstance = async () => {
    const pid = process.pid;
    const port = parseInt(process.env.PORT || "3000");
    const hostname = process.env.ADDRESS || "0.0.0.0";
    const memcached = await MemcachedConnection();
    const app = express();
    
    app.use(expressLogger);
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    
    routes(app, memcached);

    app.listen(port, hostname, () => {
        logger.info('[server]', { message: `Listening at http://${hostname}:${port} pid: ${pid}` });
    });
}


export default serverIstance;