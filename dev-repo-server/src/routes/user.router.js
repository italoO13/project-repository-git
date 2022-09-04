const express = require('express');
const userController = require('../controllers/user.controller')
const router = express.Router();
const middleAuth = require('../middlewares/auth');

router.post('/', userController.createUser);
router.use(middleAuth);
router.get('/', userController.getUserAll);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;