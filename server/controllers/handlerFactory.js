const handleAsync = require('./../utils/handleAsync');
const AppError = require('./../utils/appError');

exports.createOne = (Model) =>
  handleAsync(async (req, res, next) => {
    console.log('Here');
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  handleAsync(async (req, res, next) => {
    const doc = await Model.find();
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
