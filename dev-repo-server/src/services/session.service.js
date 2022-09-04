const bcrypt = require('bcryptjs');
const Session = require('../models/Session');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const CustomError = require('../utils/customError');

const checkPassoword = async(passwordEncode, password) => {
  return bcrypt.compare(password, passwordEncode);
}

const authSession = async(email , password) => {
  const user = await Session.userByEmail(email);
  const check = await checkPassoword(user.password, password);
  if(!check) {
    throw new CustomError(401, 'User or password not found');
  }
  const token =  jwt.sign(
    {id: user.id}, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    }
  )
  return {
    id: user.id, 
    token
  }
};


module.exports = {
  authSession,
  checkPassoword
}