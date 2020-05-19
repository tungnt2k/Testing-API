import 'reflect-metadata';
import { createConnection } from "typeorm";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'


import { httpLogger } from './middleware/httpLogger';
import { logger } from './utils/logger';

const app = express();
const PORT = process.env.PORT || 5000;

const http = require('http').Server(app)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(httpLogger);
app.use(cors())



createConnection().then(async () => {

    http.listen(PORT, () => {
        logger.error(`App was listen on port : ${PORT}`)
    })

}).catch(error => logger.error(error));
