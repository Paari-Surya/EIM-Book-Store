const express = require('express');
const bookController = require('../controllers/bookController');
const authController = require('../controllers/authController');

const router = express.Router();

//Featured Books

router
  .route('/')
  .get(bookController.getAllBooks)
  .post(
    authController.protect,
    authController.restrictTo('client', 'admin'),
    bookController.createBook
  );

router
  .route('/:id')
  .get(authController.protect, bookController.getBook)
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;

// pm.environment.set("jwt", pm.response.json().token);
// pm.environment.set("_id", pm.response._id);
//{{URL}}api/v1/clients/signup
