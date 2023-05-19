const express = require('express');
const morgan = require('morgan');
// eslint-disable-next-line import/no-extraneous-dependencies
// const multer = require('multer');
// const path = require('path');

const bookRoutes = require('./api/bookRoutes');
const userRoutes = require('./api/userRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(express.static('./public'));

//Req time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});

//ROUTES
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/users', userRoutes);

app.use(globalErrorHandler);
module.exports = app;
