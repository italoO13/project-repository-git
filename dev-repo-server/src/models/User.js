const User = require('../shemaModels/user.shemadb');
const CustomError = require('../utils/customError');

const getUserAll = async() => {
   const users = await User.find();
   return users;
}

const createUser = async (email, password) => {
  const user = await User.findOne({email});
  if(user) {
    throw new CustomError(422, `user ${email} already exists`)
  }
  const newUser = await User.create({email, password});
  return newUser;
}

const getUserById = async (id) => {
  const user = await User.findById(id);
  if(!user) {
    throw new CustomError(404, 'User not Found');
  }
  return user;
}

const updateUser = async (id, email, password) => {
  const user = await User.findById(id);
  if(!user) {
    throw new CustomError(404, 'User not Found');
  }
  await user.updateOne({email, password});
  return true;
}

const deleteUser = async (id) => {
  const user = await User.findById(id);
  if(!user) {
    throw new CustomError(404, 'User not Found');
  }
  await user.deleteOne();
  return true;
}

module.exports= {
  getUserAll,
  createUser,
  getUserById,
  updateUser,
  deleteUser
}