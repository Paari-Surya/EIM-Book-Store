const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const handleAsync = require('../utils/handleAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expiresIn:
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    httpOnly: true,
  };

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signUp = handleAsync(async (req, res, next) => {
  const { name, email, userName, password, role, passwordConfirm } = req.body;
  const newUser = await User.create({
    name,
    email,
    userName,
    role,
    password,
    passwordConfirm,
  });

  //   res.status(201).json({
  //     status: 'success',
  //     data: {
  //       data: newUser,
  //     },
  //   });

  createAndSendToken(newUser, 201, res);
});

exports.login = handleAsync(async (req, res, next) => {
  const { userName, password } = req.body;

  //Check existence of entries
  if (!userName || !password) {
    return next(new AppError('Please provide userName and password!', 400));
  }

  //User exists
  const user = await User.findOne({ userName }).select('+password');

  const correctPassword = await user.correctPassword(password, user.password);

  if (!user || !correctPassword) {
    return next(new AppError('Incorrect username or password!'));
  }

  //   const token = signToken(user._id);
  //   res.status();

  createAndSendToken(user, 200, res);
});

// LOG OUT /////////////////////////////////

exports.protect = handleAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookie.jwt) {
    token = req.cookie.jwt;
  }

  if (!token) {
    return next(
      new AppError(
        'You are not logged in. Please login to get access to this route!'
      ),
      401
    );
  }

  //Verify the token
  const decodedObj = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //Check if the user with this token still exists.
  const currentUser = await User.findById(decodedObj.id);
  if (!currentUser) {
    return next(
      new AppError('The user holding this token no longer exists!', 401)
    );
  }

  //Grant access
  req.user = currentUser;
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission perform this action!')
      );
    }
    next();
  };
