const express = require('express');
const path = require('path');
const morgan = require('morgan');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');

const bookRoutes = require('./api/bookRoutes');
const userRoutes = require('./api/userRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use('/static', express.static(path.join(__dirname, 'public')));

//ROUTES
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/users', userRoutes);

app.use(globalErrorHandler);
module.exports = app;
