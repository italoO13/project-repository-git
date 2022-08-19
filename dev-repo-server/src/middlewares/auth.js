const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/auth');
const CustomError = require('../utils/customError');
const {promisify} = require('util');

const authenticated = async(req, res, next) => {
  const { authorization } = req.headers;
  if(!authorization) {
    return next(new CustomError(401,'Token does not exist'))
  }
  const [, token] = authorization.split(' ');
  try {
    const decoded = await promisify(jwt.verify)(token, jwtConfig.secret);
    req.userId = decoded.id;
    next()
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = authenticated;