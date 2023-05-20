const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signUp);

router
  .route('/')
  .get(
    authController.protect,
    // authController.restrictTo('admin'),
    userController.getAllUsers
  )
  .post(userController.createUser);
router
  .route('/:id')
  .get(authController.protect, userController.getUser)
  // PATCH has to be accesible only by the current user/client and admin
  .patch(authController.protect, userController.updateUser)
  .delete(authController.protect, userController.deleteUser);

router.post(
  '/:userId/addBook',
  authController.protect,
  authController.restrictTo('user'),
  userController.userAddBook
);

module.exports = router;
