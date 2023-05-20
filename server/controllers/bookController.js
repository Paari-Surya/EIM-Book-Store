const Book = require('../models/bookModel');
// const User = require('../models/userModel');
const handleAsync = require('../utils/handleAsync');
const factory = require('./handlerFactory');

//Featured books
exports.featured5Books = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-averageRating,-_createdAt';
  next();
};

exports.getAllBooks = factory.getAll(Book);
// exports.createBook = factory.createOne(Book);
exports.getBook = factory.getOne(Book, 'owner');
exports.updateBook = factory.updateOne(Book);
exports.deleteBook = factory.deleteOne(Book);

exports.createBook = handleAsync(async (req, res, next) => {
  // const imgPath = req.body.files.coverImg[0].path;
  // const pdfPath = req.body.files.book[0].path;
  // req.body.imgPath = imgPath;
  // req.body.pdfPath = pdfPath;
  console.log(req.body);
  const doc = await Book.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.getBookBuyers = handleAsync(async (req, res, next) => {
  const { bookId } = req.params;
  const book = await Book.findById(bookId).populate('buyers');
  const { buyers } = book;
  res.status(200).json({
    status: 'success',
    data: {
      buyers,
    },
  });
});

//getDemo
//getFullBook
