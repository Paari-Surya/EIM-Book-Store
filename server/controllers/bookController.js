const Book = require('../models/bookModel');
const factory = require('./handlerFactory');

//Featured books
exports.featured5Books = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort('-averageRating');
  next();
};

exports.getAllBooks = factory.getAll(Book);
exports.createBook = factory.createOne(Book);
exports.getBook = factory.getOne(Book, 'owner');
exports.updateBook = factory.updateOne(Book);
exports.deleteBook = factory.deleteOne(Book);

//getDemo
//getFullBook
