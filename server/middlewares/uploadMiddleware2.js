const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const AppError = require('../utils/appError');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'book') {
      cb(null, path.join(__dirname, './uploads/pdf/'));
    } else if (file.fieldname === 'coverImg') {
      cb(null, path.join(__dirname, './uploads/img/'));
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === 'book') {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    } else if (file.fieldname === 'coverImg') {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
  },
});

function checkFileType(file, cb) {
  if (file.fieldname === 'book') {
    if (file.mimetype === 'application/pdf') {
      // check file type to be pdf
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  } else if (file.fieldname === 'coverImg') {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/gif'
    ) {
      // check file type to be png, jpeg, or jpg
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).fields([
  {
    name: 'book',
    maxCount: 1,
  },
  {
    name: 'coverImg',
    maxCount: 1,
  },
]);

const uploadMiddleware = (req, res, next) =>
  upload(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return next(new AppError('File upload error occured!', 400));
      }
      return next(new AppError('Internal server error', 500));
    }
    next();
  });

module.exports = uploadMiddleware;
