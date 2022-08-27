const sessionService = require('../services/session.service');

const createSession = async(req, res, next) => {
  try {
    const {email, password} = req.body;
    const {id, token} = await sessionService.authSession(email, password);
    res.status(201).json({
      user: {
        id,
        email
      },
      token
    })
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createSession,
}