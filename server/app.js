const express = require('express');
const morgan = require('morgan');

const bookRoutes = require('./api/bookRoutes');
const userRoutes = require('./api/userRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.use(morgan('dev'));

app.use(express.json());

//Req time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES
app.use('/api/v1/books', bookRoutes);

app.use(globalErrorHandler);
module.exports = app;
