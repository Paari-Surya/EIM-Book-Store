const fs = require('fs');
const handleAsync = require('../utils/handleAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const Book = require('../models/bookModel');

exports.deleteOne = (Model) =>
  handleAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError('No document found with that ID!', 404));
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  handleAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(new AppError('No document found with that ID!', 404));

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  handleAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  handleAsync(async (req, res, next) => {
    const doc = popOptions
      ? await Model.findById(req.params.id).populate(popOptions)
      : await Model.findById(req.params.id);

    if (!doc) return next(new AppError('No document found with that ID!', 404));
    console.log(doc);
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

const checkOwnerNull = handleAsync(async (Model, dataArr) => {
  const filteredArr = dataArr
    .filter((el) => el.owner === null)
    .map((el) => el._id.toString());
  console.log(filteredArr);
  if (filteredArr.length !== 0) {
    await Model.deleteMany({ _id: { $in: filteredArr } });
    return true;
  }
  return false;
});

exports.getAll = (Model) =>
  handleAsync(async (req, res, next) => {
    const queryOptions = new APIFeatures(Model.find(), req.query)
      .sort()
      .limitFields()
      .paginate();
    let doc;
    if (Model === Book) {
      doc = await queryOptions.query.populate('owner');
      // doc = checkOwnerNull(Book, doc);
      const reloadData = checkOwnerNull(Book, doc);
      console.log(reloadData);
      if (reloadData) doc = await queryOptions.query.populate('owner');
    } else doc = await queryOptions.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

// exports.getAll = (Model) =>
//   handleAsync(async (req, res, next) => {
//     console.log(req.query);
//     const doc = await Model.find();
//     res.status(200).json({
//       status: 'success',
//       results: doc.length,
//       data: {
//         data: doc,
//       },
//     });
//   });
