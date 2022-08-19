const userService = require('../services/user.service');

const getUserAll = async(req, res, next) => {
  try {
    const users = await userService.getUserAll();
    return res.send(users);
  } catch (error) {
    next(error)
  }
}

const createUser = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const newUser = await userService.createUser(email, password);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    next(error)
  }
}

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {email, password} = req.body;
    const response = await userService.updateUser(id, email, password);
    if(response) {
      res.status(200).json({message:'successfully updated'});
    }
    res.status(500).json({message:'Error server'});
  } catch (error) {
    next(error);
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await userService.deleteUser(id);
    if(response) {
      res.status(200).json({message:'successfully delete'});
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUserAll,
  createUser,
  getUserById,
  updateUser,
  deleteUser
}