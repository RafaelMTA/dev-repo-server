import express, {Router} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import routes from './routes/routes.js';
import './database/index.js';

class App{
    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(express.json());
        this.server.use(cors());
        this.server.use(morgan('dev'));
        this.server.use(helmet());
    }

    routes(){       
        this.server.use(routes);
    }
}

export default new App().server