const express = require('express');
const bookController = require('./../controllers/bookController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(bookController.getAllBooks)
  .post(bookController.createBook);

module.exports = router;
