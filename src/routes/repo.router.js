const express = require('express');
const repoController = require('../controllers/repo.controller');
const router = express.Router();

router.get('/:userId', repoController.getRepoAll);
router.post('/:userId', repoController.createRepo);
router.delete('/:userId/:repoId', repoController.deleteRepo);


module.exports = router;