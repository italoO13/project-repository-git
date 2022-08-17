const User = require('../models/User');
const bcrypt = require('bcryptjs');

const crypt = async (password) => {
  return bcrypt.hash(password, 8);
}

const getUserAll = async() => {
  const users = await User.getUserAll();
  return users;
}

const createUser = async(email, password) => {
  const newUser = await User.createUser(email, await crypt(password))
  return newUser;
}

const getUserById= async (id) => {
  const user = await User.getUserById(id);
  return user;
}

const updateUser = async (id, email, password) => {
 const response = await User.updateUser(id, email, await crypt(password));
 return response; 
}

const deleteUser = async(id) => {
  const response = await User.deleteUser(id);
  return response;
}

module.exports = {
  getUserAll,
  createUser,
  getUserById,
  updateUser,
  deleteUser
}