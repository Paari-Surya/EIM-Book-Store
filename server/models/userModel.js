const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A user must have a name.'],
      min: 5,
      max: 25,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email.'],
    },
    userName: {
      type: String,
      unique: true,
      min: 7,
      max: 25,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'client', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: true,
      select: false,
      min: 7,
      max: 20,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password.'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same',
      },
    },
    books: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Hash password
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.virtual('myBooks', {
  ref: 'Book',
  foreignField: 'owner',
  localField: '_id',
});

//Check password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
