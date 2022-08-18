const express = require('express');
const helloRouter = require('./hello.router');
const userRouter = require('./user.router');
const repoRouter = require('./repo.router');
const routes = express.Router();

routes.use('/hellow',helloRouter);
routes.use('/user', userRouter)
routes.use('/repo', repoRouter)

module.exports = routes;