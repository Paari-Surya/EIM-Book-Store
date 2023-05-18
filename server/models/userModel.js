const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  //   active: {
  //     type: Boolean,
  //     default: true,
  //     select: false,
  //   },
});

userSchema.pre('save', async function (next) {
  // Hash password
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

//Methods
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
