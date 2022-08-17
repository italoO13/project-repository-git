const express = require('express');
const helloRouter = require('./hello.router');
const userRouter = require('./user.router');
const routes = express.Router();

routes.use('/hellow',helloRouter);
routes.use('/user', userRouter)

module.exports = routes;