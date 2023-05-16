const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.use(express.json());

//Req time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

module.exports = app;
