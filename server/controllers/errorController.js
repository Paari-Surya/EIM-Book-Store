const AppError = require('./../utils/appError');

const sendErrorDev = (err, res) => {
  console.log(err.statusCode);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Hello');
    sendErrorDev(err, res);
  }
  next(); //
};
