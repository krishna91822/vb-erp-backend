const express = require("express");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
// const cors = require("cors");

const AppError = require("./utility/appError");
const globalErrorHandler = require("./middleware/errorMiddleware");
const { checkAndAssignRole } = require("./middleware/rolesMiddleware");

const employeeRouter = require("./routes/employeeRoutes");
const reviewRouter = require("./routes/ReviewRoutes");

const app = express();

//mongoDb connection
const DB =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DATABASE_URI
    : process.env.DATABASE_URL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection successful"))
  .catch((err) => {
    console.log(err);
  });

mongoose.connection.on("disconnected", () => {
  console.log(`mongoose disconnected`);
});

mongoose.connection.on("error", (err) => {
  console.log(`mongoose err is ${err}`);
});
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//middlewares
// if (process.env.NODE_ENV === "development") {
app.use(morgan("dev"));
// }
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//For Assigning role
app.use(checkAndAssignRole);

//Routes
app.use("/employees", employeeRouter);
app.use("/reviews", reviewRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});

//error handler
app.use(globalErrorHandler);

module.exports = app;
