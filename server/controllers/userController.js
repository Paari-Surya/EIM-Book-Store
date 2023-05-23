const User = require('../models/userModel');
const Book = require('../models/bookModel');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const handleAsync = require('../utils/handleAsync');

exports.getAllUsers = factory.getAll(User);

exports.getUser = factory.getOne(User, 'myBooks');
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

exports.createUser = (req, res, next) => {
  res.status(400).json({
    status: 'fail',
    message: 'This route is not for adding users. Use signup instead.',
  });
};

exports.getUserBooks = handleAsync(async (req, res, next) => {
  //Used for users as well as clients. The page of display in frontend changes.
  const { id } = req.params;
  const user = await User.findById(id).populate('books');
  const { books } = user;
  res.status(200).json({
    status: 'success',
    data: {
      books,
    },
  });
});

exports.userAddBook = handleAsync(async (req, res, next) => {
  const { userId, bookId } = req.body;
  // const { bookId } = req.params;
  const { user } = req;
  const book = await Book.findById(bookId);

  if (!book) {
    return next(new AppError('User or book not found', 404));
  }
  if (!user.books) user.books = [];
  if (user.books.includes(bookId))
    return next(new AppError('User have this book already!', 400));
  user.books.push(bookId);
  await User.findByIdAndUpdate(
    user._id,
    { books: user.books },
    {
      new: true,
      runValidators: true,
    }
  );

  book.buyers.push(userId);
  await book.save();

  res.status(200).json({
    status: 'success',
    data: {
      userId,
      bookId,
    },
  });
});

exports.userRemoveBook = handleAsync(async (req, res, next) => {
  const { bookId } = req.params;
  const user = await User.findById(req.user.id);
  if (!user || !user.books)
    return next(new AppError('User or books not found!', 404));
  if (!user.books.includes(bookId))
    return next(
      new AppError('This book is not available with this user!', 404)
    );
  const updatedArr = user.books.filter(
    (el) => el.toString() !== bookId.toString()
  );
  await User.findByIdAndUpdate(
    user._id,
    { books: updatedArr },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: 'success',
    data: {
      user: user.id,
      bookId,
    },
  });
});
