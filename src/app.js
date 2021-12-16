require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const constants = require("./utility/constant");

const AppError = require("./utility/appError");
const globalErrorHandler = require("./middleware/errorMiddleware");
const { checkAndAssignRole } = require("./middleware/rolesMiddleware");
const { isAuthorized } = require("./middleware/auth");
const { connectToDb } = require("./utility/db");
const { closeConnection } = require("./utility/db");
const router = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../public/api-docs/swagger-output.json");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//middlewares
// if (process.env.NODE_ENV === "development") {
app.use(morgan("dev"));
// }
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, constants.SWAGER_OPTIONS)
);

//For checking token
// app.use(isAuthorized);
//For Assigning role
// app.use(checkAndAssignRole);

app.use(cors(constants.CORS_OPTIONS));
//Routes
app.use(router);
app.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, constants.SWAGER_OPTIONS)
);
app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});

//error handler
app.use(globalErrorHandler);
if (process.env.NODE_ENV !== "test") {
  const server = app.listen(process.env.PORT, async () => {
    await connectToDb();
    console.log(`App listening on port ${process.env.PORT}`);
    process.on("uncaughtException", function () {
      server.close(function () {
        console.log("Finished all requests");
      });
    });
    process.on("SIGTERM", function () {
      server.close(function () {
        console.log("Finished all requests");
      });
    });
  });
} else {
  connectToDb();
}

module.exports = app;
