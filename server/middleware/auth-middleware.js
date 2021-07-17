const jwt = require('jsonwebtoken');

const User = require('../models/user-model');
const HttpError = require('../models/http-error');

const private = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (err) {
      const error = new HttpError('You are not authorized. Token failed.', 401);
      return next(error);
    }
  }

  if (!token) {
    const error = new HttpError('You are not authorized. No Token.', 401);
    return next(error);
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    const error = new HttpError('You are not authorized as an admin.', 401);
    return next(error);
  }
};

module.exports = { private, admin };
