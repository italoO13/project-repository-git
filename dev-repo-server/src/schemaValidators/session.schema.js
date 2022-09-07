const joi = require('joi');

const createSession = joi.object({
  email: joi.string().email().required().error(new Error('Email field is required')),
  password: joi.string().required().error(new Error('Password field is required'))
})

module.exports = {
  createSession
}