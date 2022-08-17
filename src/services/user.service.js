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

module.exports = {
  getUserAll,
  createUser,
  getUserById
}