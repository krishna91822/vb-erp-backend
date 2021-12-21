require("dotenv").config();
const DB = process.env.MONGO_URL;
// process.env.NODE_ENV === "test"
//   ? process.env.TEST_DATABASE_URI
//   : process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
// process.env.NODE_ENV === "test";
// ? process.env.TEST_DATABASE_URI
// : process.env.DATABASE_URL;

const mongoose = require("mongoose");
const db = mongoose.connection;

const connectToDb = () => {
  mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db.on("error", console.error.bind(console, "connection error: "));
  db.on("open", console.error.bind(console, "DB connected: "));
  db.on("close", console.error.bind(console, "Connection closed"));
};

const closeConnection = () => {
  db.close();
};

module.exports = { connectToDb, closeConnection };
