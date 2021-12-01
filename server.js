const dotenv = require('dotenv');

//error handler for uncaught exception
process.on('uncaughtException', (err) => {
  console.log(err.name, err);
  console.log('UNCAUGHT EXCEPTION! 🔥 Shutting Down...');
  process.exit(1);
});

//path of config.env
dotenv.config({ path: './config.env' }); //always need to be on top below uncaught exception handler

const app = require('./app');
const mongoose = require('mongoose');

//mongoDb connection
const DB =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URI
    : process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful'))
  .catch((err) => {
    console.log(err);
  });

mongoose.connection.on('disconnected', () => {
  console.log(`mongoose disconnected`);
});

mongoose.connection.on('error', (err) => {
  console.log(`mongoose err is ${err}`);
});

//server
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`server starting on PORT ${PORT}....`);
});

//error handler for unhandled rejection
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 🔥 Shutting Down...');
  server.close(() => {
    process.exit(1);
  });
});
