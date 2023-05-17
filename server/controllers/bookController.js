const Book = require('../models/bookModel');
// const handleAsync = require('../utils/handleAsync');
const factory = require('./handlerFactory');

//Featured books

exports.getAllBooks = factory.getAll(Book);
exports.getBook = factory.getOne(Book);
exports.createBook = factory.createOne(Book);
exports.updateBook = factory.updateOne(Book);
exports.deleteBook = factory.deleteOne(Book);

//getDemo
//getFullBook
