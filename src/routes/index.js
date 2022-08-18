const express = require('express');
const helloRouter = require('./hello.router');
const userRouter = require('./user.router');
const sessionRouter = require('./session.router');
const middleAuth = require('../middlewares/auth');
const repoRouter = require('./repo.router');
const routes = express.Router();

routes.use('/hellow',helloRouter);
routes.use('/session', sessionRouter)

routes.use(middleAuth);
routes.use('/user', userRouter);
routes.use('/repo', repoRouter);

module.exports = routes;