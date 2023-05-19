const express = require('express');
const bookController = require('../controllers/bookController');
const authController = require('../controllers/authController');

const router = express.Router();

//Featured Books
router.get(
  '/featured',
  bookController.featured5Books,
  bookController.getAllBooks
);

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

router.get(
  '/:bookId/buyers',
  authController.protect,
  bookController.getBookBuyers
);

module.exports = router;
