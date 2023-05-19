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
    buyers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    imgPath: String,
    pdfPath: String,
    createdAt: {
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

bookSchema.pre(/^find/, function (next) {
  this.find({ secretBook: { $ne: true } });
  this.start = Date.now();

  next();
});

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
