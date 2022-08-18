const User = require('../shemaModels/user.shemadb');
const CustomError = require('../utils/customError');

const userByEmail = async(email) => {
  const user = await User.findOne({
    email,
  })
  if(!user) {
    throw new CustomError(401, 'User or Passowrd not Found');
  }
  return user;
}

module.exports = {
  userByEmail
}