const mongoose = require('mongoose');
const slugify = require('slugify');

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A book must have a name.'],
      unique: true,
      min: 5,
      max: 25,
      trim: true,
      uppercase: true,
    },
    author: {
      type: String,
      required: [true, 'A book must have an author.'],
      min: 5,
      max: 25,
      trim: true,
      uppercase: true,
    },
    publisher: {
      type: String,
      required: [true, 'A book must contain a publisher.'],
      min: 5,
      max: 25,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      trim: true,
      min: 10,
    },
    pages: Number,
    year: {
      type: Number,
      min: 1000,
      max: 2025,
    },
    edition: {
      type: String,
      trim: true,
      default: 'First Edition',
    },
    categories: {
      type: String,
      trim: true,
    },
    language: String,
    file_extention: {
      type: String,
      default: '.pdf',
    },
    buyers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    imgPath: String,
    pdfPath: String,
    averageRating: {
      type: Number,
      min: 1,
      max: 5,
    },
    _createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//slug
bookSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });

  next();
});

// bookSchema.pre(/^find/, function (next) {
//   this.find({ secretBook: { $ne: true } });
//   this.start = Date.now();

//   next();
// });

// Total_Buyers
bookSchema.virtual('totalBuyers').get(function () {
  return this.buyers.length;
});

// Check perfomance
// bookSchema.post(/^find/, function (docs, next) {
//   const queryTime = Date.now() - this.start;
//   if (queryTime < 40) console.log(`Query took ${queryTime} ms`.green);
//   else if (queryTime > 40) console.log(`Query took ${queryTime} ms`.red);
//   next();
// });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
