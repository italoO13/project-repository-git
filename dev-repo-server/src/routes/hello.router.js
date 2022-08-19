const express = require('express');
const helloControler = require('../controllers/hello.controller');
const router = express.Router();

router.get('/', helloControler.index);

module.exports = router;