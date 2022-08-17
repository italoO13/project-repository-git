const express = require('express');
const helloRouter = require('./hello.router');
const routes = express.Router();

routes.use('/hellow',routes);

module.exports = routes;