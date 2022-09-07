const sessionSchema = require('../schemaValidators/session.schema');
const CustomError = require('../utils/customError');

const createSession = (req, res, next) => {
  const {error} = sessionSchema.createSession.validate(req.body);
  if(!error) {
    return next();
  }
  next(new CustomError(401, error.message));
}

module.exports= {
  createSession,
}