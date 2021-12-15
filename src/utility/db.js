require("dotenv").config();
const DB = "mongodb://127.0.0.1:27017/vb-erp";
// process.env.NODE_ENV === "test"
//   ? process.env.TEST_DATABASE_URI
//   : process.env.DATABASE_URL;

const mongoose = require("mongoose");
const db = mongoose.connection;

const connectToDb = () => {
  mongoose.connect(DB);
  console.log(`DB is ${DB}`);
  db.on("error", console.error.bind(console, "connection error: "));
  db.on("open", console.error.bind(console, "DB connected: "));
  db.on("close", console.error.bind(console, "Connection closed"));
};

const closeConnection = () => {
  db.close();
};

module.exports = { connectToDb, closeConnection };
