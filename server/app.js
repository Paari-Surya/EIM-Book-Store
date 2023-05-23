const express = require('express');
const path = require('path');
const morgan = require('morgan');
// eslint-disable-next-line import/no-extraneous-dependencies
// const multer = require('multer');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');

const bookRoutes = require('./api/bookRoutes');
const userRoutes = require('./api/userRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

// app.use((req, res, next) => {
//   console.log('REQ BODY : '.bgBrightRed, req.body);
//   next();
// });

console.log(path.join(__dirname, 'public'));

app.use(express.static(path.join(__dirname, 'public')));

//Req time
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   console.log(req.requestTime);
//   next();
// });

//ROUTES
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/users', userRoutes);

app.use(globalErrorHandler);
module.exports = app;
