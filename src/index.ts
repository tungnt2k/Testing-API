import 'reflect-metadata';
import { createConnection } from "typeorm";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

import { getRepository } from 'typeorm';
import { User } from './entity/User';
import { hashSync, genSaltSync } from 'bcryptjs';

import { httpLogger } from './middleware/httpLogger';
import { logger } from './utils/logger';

import authRoutes from './route/auth.routes';
import levelRoutes from './route/level.routes';
import categoryRoutes from './route/category.routes';

const app = express();
const PORT = process.env.PORT || 5000;

const http = require('http').Server(app)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(httpLogger);
app.use(cors())

// Create admin
// const repos = getRepository(User);
// const adminUser = new User();
// const salt = genSaltSync(10)
// adminUser.username = 'admin';
// adminUser.password = hashSync('amelajsc123', salt);
// await repos.save(adminUser);


// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/level', levelRoutes);
app.use('/api/category', categoryRoutes);
createConnection().then(async () => {

    http.listen(PORT, () => {
        logger.error(`App was listen on port : ${PORT}`)
    })

}).catch(error => logger.error(error));
