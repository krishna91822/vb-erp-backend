require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const constants = require("./src/utility/constant");

const AppError = require("./src/utility/appError");
const globalErrorHandler = require("./src/middleware/errorMiddleware");
const { checkAndAssignRole } = require("./src/middleware/rolesMiddleware");
const { isAuthorized } = require("./src/middleware/auth");
const { connectToDb } = require("./src/utility/db");
const { closeConnection } = require("./src/utility/db");
const router = require("./src/routes");

const app = express();

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

app.use(cors(constants.CORS_OPTIONS));
//Routes
app.use(router);
app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});

//error handler
app.use(globalErrorHandler);
if (process.env.NODE_ENV !== "test") {
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
  connectToDb();
}

module.exports = app;
