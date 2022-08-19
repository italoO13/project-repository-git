const bcrypt = require('bcryptjs');
const Session = require('../models/Session');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const CustomError = require('../utils/customError');

const checkPassoword = (passwordEncode, password) => {
  return bcrypt.compare(passwordEncode, password);
}

const authSession = async(email , password) => {
  const user = await Session.userByEmail(email);
  const check = checkPassoword(user.password, password);
  if(!check) {
    throw new CustomError(401, 'User or password not found');
  }
  return jwt.sign(
    {id: user.id}, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    }
  )
};


module.exports = {
  authSession
}