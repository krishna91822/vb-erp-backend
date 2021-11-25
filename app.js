require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const empRoute = require("./routes/employeeRoute");
const requestRoute = require("./routes/requestRoute");
const ReviewRoute = require("./routes/ReviewRoutes");

const app = express();

let connectionString =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DATABASE_URI
    : process.env.DATABASE_URL;
mongoose
  .connect(connectionString)
  .then(() => {
    console.log(`mongodb connected!`);
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.connection.on("disconnected", () => {
  console.log(`mongoose disconnected`);
});

mongoose.connection.on("error", (err) => {
  console.log(`mongoose err is ${err}`);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/employee", empRoute);
app.use("/request", requestRoute);
app.use("/reviews", ReviewRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
