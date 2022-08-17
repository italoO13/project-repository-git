const userController = require('../services/user.service');

const getUserAll = async(req, res, next) => {
  try {
    const users = await userController.getUserAll();
    return res.send(users);
  } catch (error) {
    next(error)
  }
}

const createUser = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const newUser = await userController.createUser(email, password);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    next(error)
  }
}

module.exports = {
  getUserAll,
  createUser
}