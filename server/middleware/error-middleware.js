const fs = require('fs');
const HttpError = require('../models/http-error');

const notFound = (req, res, next) => {
  const error = new HttpError(`Not Found - ${req.originalUrl}`, 404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  res.status(error.code || 500);
  res.json({
    message: error.message,
  });
};

module.exports = { notFound, errorHandler };
