const fs = require('fs');
const path = require('path');
const Book = require('../models/bookModel');
// const User = require('../models/userModel');
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
// exports.createBook = factory.createOne(Book);
exports.getBook = factory.getOne(Book, 'owner');
exports.updateBook = factory.updateOne(Book);
exports.deleteBook = factory.deleteOne(Book);

exports.createBook = handleAsync(async (req, res, next) => {
  // const imgPath = req.body.files.coverImg[0].path;
  // const pdfPath = req.body.files.book[0].path;
  // req.body.imgPath = imgPath;
  // req.body.pdfPath = pdfPath;
  // console.log(req.body);
  const doc = await Book.create(req.body);
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

// exports.getBook = handleAsync(async (req, res, next) => {
//   const doc = await Book.findById(req.params.id).populate('owner');
//   if (!doc) return next(new AppError('No document found with that ID!', 404));
//   const { pdfPath } = doc;
//   fs.readFile(pdfPath, (err, data) => {
//     if (err) {
//       return next(new AppError('Error reading pdf file'));
//     }
//     const fileData = data.toString('base64');
//   });
//   const resData = {
//     ...doc,
//     fileData,
//   };
//   res.status(200).json({
//     status: 'success',
//     data: {
//       data: resData,
//     },
//   });
// });

// exports.getBookData = handleAsync(async (req, res, next) => {

// })

exports.getBookBuyers = handleAsync(async (req, res, next) => {
  const { bookId } = req.params;
  const book = await Book.findById(bookId).populate('buyers');
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
