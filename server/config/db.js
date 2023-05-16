const mongoose = require('mongoose');

module.exports = async () => {
  try {
    const DB = process.env.DATABASE.replace(
      '<PASSWORD>',
      process.env.DATABASE_PASSWORD
    );
    const conn = await mongoose.connect(DB);
    console.log(`DB connected: ${conn.connection.host}`.bgBrightYellow);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
