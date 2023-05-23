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
// exports.getClientBooks = handleAsync(async (req, res, next) => {
//   const { id } = req.params;
//   const user = await User.findById(id).populate('myBooks');
//   const { books } = user;
//   res.status(200).json({
//     status: 'success',
//     data: {
//       books,
//     },
//   });
// });
exports.userAddBook = handleAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { bookId } = req.body;

  const { user } = req;
  const book = await Book.findById(bookId);

  if (!book) {
    return next(new AppError('User or book not found', 400));
  }
  if (user.role === 'client' || user.role === 'admin') {
    return next(
      new AppError(
        'The client cannot add books to his list. Post api/books instead.'
      )
    );
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
