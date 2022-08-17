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


module.exports= {
  getUserAll,
  createUser
}