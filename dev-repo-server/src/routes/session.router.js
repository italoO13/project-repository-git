const express = require('express');
const sessionController = require('../controllers/sessions.controller');
const sessionValidators = require('../middlewares/sessionValidators');
const router = express.Router();

router.post('/', sessionValidators.createSession,  sessionController.createSession);

module.exports = router;