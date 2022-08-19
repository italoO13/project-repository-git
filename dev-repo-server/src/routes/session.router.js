const express = require('express');
const sessionController = require('../controllers/sessions.controller');
const router = express.Router();

router.post('/', sessionController.createSession);

module.exports = router;