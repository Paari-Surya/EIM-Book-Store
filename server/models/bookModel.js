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

// Indexing the results
// Any virtual property.
// Virtual populate review in our case.

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

//pre find query to populate the buyers.
bookSchema.virtual('totalBuyers').get(function () {
  return this.buyers.length;
});

// To check perfomance of queries.
bookSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} ms`);
  next();
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
