const User = require('../models/User');

const getUserAll = async() => {
  const users = await User.getUserAll();
  return users;
}

const createUser = async(email, password) => {
  const newUser = await User.createUser(email, password)
  return newUser;
}

module.exports = {
  getUserAll,
  createUser
}