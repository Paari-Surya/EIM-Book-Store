const Book = require('./../models/bookModel');
const handleAsync = require('./../utils/handleAsync');
const factory = require('./handlerFactory');

exports.getAllBooks = handleAsync(async (req, res, next) => {
  const books = await Book.find();
  res.status(200).json({
    status: 'success',
    data: {
      books,
    },
  });
});

// exports.getAllBooks = factory.getAll(Book);

exports.createBook = factory.createOne(Book);
