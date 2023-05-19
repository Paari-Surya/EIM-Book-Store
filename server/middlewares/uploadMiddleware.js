// /* eslint-disable import/no-extraneous-dependencies */
// const path = require('path');
// const multer = require('multer');
// const AppError = require('../utils/appError');

// //Config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     if (file.mimetype === 'application/pdf') {
//       cb(null, '../public/uploads/pdf');
//     } else if (file.mimetype === 'image/') {
//       cb(null, '../public/img');
//     } else {
//       const error = new Error(
//         'File upload error occurred! Only pdf and img are allowed.'
//       );
//       error.status = 400;
//       cb(error);
//     }
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e2)}`;
//     cb(null, `${file.fieldname}-${uniqueName}`);
//   },
// });

// const upload = multer(storage);

// // Middleware
// const uploadMiddleware = (req, res, next) => {
//   upload.fields([
//     { name: 'pdf', maxCount: 1 },
//     { name: 'image', maxCount: 1 },
//   ])(req, res, (err) => {
//     if (err) {
//       if (err instanceof multer.MulterError) {
//         return next(new AppError('File upload error occured!', 400));
//       }
//       return next(new AppError('Internal server error', 500));
//     }
//     next();
//   });
// };

// module.exports = uploadMiddleware;
