const fs = require('fs');
const path = require('path');
const Book = require('../models/bookModel');
const handleAsync = require('../utils/handleAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

//Featured books
exports.featured5Books = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-averageRating';
  next();
};

exports.getAllBooks = factory.getAll(Book);
exports.getBook = factory.getOne(Book, 'owner');
exports.updateBook = factory.updateOne(Book);
exports.deleteBook = factory.deleteOne(Book);

exports.createBook = handleAsync(async (req, res, next) => {
  const { imgPath } = req.body;
  const { pdfPath } = req.body;
  console.log(req.body.data);
  const jsonData = JSON.parse(req.body.data);
  const bookData = { ...jsonData, imgPath, pdfPath };
  const doc = await Book.create(bookData);
  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.getBookFile = handleAsync(async (req, res, next) => {
  const { pdfPath } = req.body;

  const fileStream = fs.createReadStream(pdfPath);
  const stat = fs.statSync(pdfPath);

  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=book.pdf');
  fileStream.pipe(res);
});

exports.getBookBuyers = handleAsync(async (req, res, next) => {
  const { bookId } = req.params;
  const book = await Book.findById(bookId).populate('buyers').populate('owner');
  console.log(book);
  // const { buyers } = book;
  res.status(200).json({
    status: 'success',
    data: {
      // buyers,
      book,
    },
  });
});

//getDemo
//getFullBook
