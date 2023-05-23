const express = require('express');
const bookController = require('../controllers/bookController');
const authController = require('../controllers/authController');
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const handleAsync = require('../utils/handleAsync');

const router = express.Router();

//Featured Books
router.get(
  '/featured',
  authController.protect,
  bookController.featured5Books,
  bookController.getAllBooks
);

router
  .route('/')
  .get(authController.protect, bookController.getAllBooks)
  .post(
    authController.protect,
    authController.restrictTo('client', 'admin'),
    uploadMiddleware,
    bookController.createBook
  );

router
  .route('/:id')
  .get(authController.protect, bookController.getBook)
  .patch(
    authController.protect,
    authController.restrictTo('client', 'admin'),
    bookController.updateBook
  )
  .delete(
    authController.protect,
    authController.restrictTo('client', 'admin'),
    bookController.deleteBook
  );

router.get('/:id/bookPdf', authController.protect, bookController.getBookFile);

router.get(
  '/:bookId/buyers',
  authController.protect,
  bookController.getBookBuyers
);

module.exports = router;
