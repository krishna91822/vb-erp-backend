const express = require("express");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
// const cors = require("cors");

const AppError = require("./src/utility/appError");
const globalErrorHandler = require("./src/middleware/errorMiddleware");
const { checkAndAssignRole } = require("./src/middleware/rolesMiddleware");
const { isAuthorized } = require("./src/middleware/auth");
const employeeRouter = require("./src/routes/employeeRoutes");
const reviewRouter = require("./src/routes/ReviewRoutes");
const { connectToDb } = require("./src/utility/db");
const { closeConnection } = require("./src/utility/db");
const router = require("./src/routes");

const app = express();

//mongoDb connection
console.log(`process.env.NODE_ENV is ${process.env.NODE_ENV}`);
// const DB =
//   process.env.NODE_ENV === "test"
//     ? process.env.TEST_DATABASE_URI
//     : process.env.DATABASE_URL;

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("DB connection successful"))
//   .catch((err) => {
//     console.log(err);
//   });

// mongoose.connection.on("disconnected", () => {
//   console.log(`mongoose disconnected`);
// });

// mongoose.connection.on("error", (err) => {
//   console.log(`mongoose err is ${err}`);
// });
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

//For checking token
// app.use(isAuthorized);
//For Assigning role
// app.use(checkAndAssignRole);

//Routes
app.use(router);
app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});

//error handler
app.use(globalErrorHandler);
if (process.env.NODE_ENV !== "test") {
  console.log(`app is not test`);
  const server = app.listen(process.env.PORT, async () => {
    await connectToDb();

    process.on("uncaughtException", function () {
      server.close(function () {
        console.log("Finished all requests");
        closeConnection();
      });
    });
    process.on("SIGTERM", function () {
      server.close(function () {
        console.log("Finished all requests");
        closeConnection();
      });
    });
  });
} else {
  console.log(`app is test`);
  connectToDb();
}

module.exports = app;
