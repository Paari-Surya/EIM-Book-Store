const path = require('path');
const { promisify } = require('util');
// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');

const handleAsync = require('../utils/handleAsync');
const AppError = require('../utils/appError');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'book') {
      cb(null, path.join(__dirname, '../public/uploads/pdf'));
    } else if (file.fieldname === 'coverImg') {
      cb(null, path.join(__dirname, '../public/uploads/img/'));
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
      file.mimetype === 'image/jpeg'
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

const uploadMiddleware = handleAsync(async (req, res, next) => {
  const uploadAsync = promisify(upload);
  await uploadAsync(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return next(new AppError('File upload error occured!', 400));
      }
      console.log(err);
      return next(new AppError(err, 500));
    }
    // req.body = JSON.parse(req.body.data);
    // console.log(req);
    // console.log(req.body);
    const imgPath = req.files.coverImg[0].path;
    const pdfPath = req.files.book[0].path;
    req.body.imgPath = imgPath;
    req.body.pdfPath = pdfPath;
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    req.body.files = { ...req.files };
    console.log('No prblm in upload Middleware');
    next();
  });
});

module.exports = uploadMiddleware;
