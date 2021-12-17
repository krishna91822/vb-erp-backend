require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const constants = require("./utility/constant");
const { connectToDb } = require("./utility/db");
const swaggerUi = require("swagger-ui-express");
const router = require("./routes");
const swaggerFile = require("../public/api-docs/swagger-output.json");
const globalErrorHandler = require("./middleware/errorMiddleware");
const { scheduler } = require("./utility/jobScheduler");

const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, constants.SWAGER_OPTIONS)
);
app.use(cors(constants.CORS_OPTIONS));
app.use(router);
app.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, constants.SWAGER_OPTIONS)
);
app.use(globalErrorHandler);
app.listen(port, async () => {
  await connectToDb();
  scheduler();
});
module.exports = app;
