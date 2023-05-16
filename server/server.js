const app = require('./app');
const dotenv = require('dotenv');
const colors = require('colors');

const connectDB = require('./config/db');

dotenv.config({ path: './config.env' });

connectDB();

const port = process.env.port || 8000;
app.listen(port, () => {
  console.log(`App listening to port ${port}`.brightGreen.underline);
});
