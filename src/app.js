// importing packages
const express = require("express");
require("./db/config");
const cors = require("cors"); // importing middleware packages

const app = express();

//Swagger UI
const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("../swagger.json");

var corsOptions = {
    origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// PORT
const PORT = 3030;

// Routes
const router = require("./routes/index");
app.use(express.json());

// Home Page
app.get("/", (req, res) =>
    res.send(
        `<h1 style="text-align: center; font-family: Ubuntu">
            Welcome to PMO API
        </h1>`
    )
);
app.use(router);

//Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Server
app.listen(PORT, () => {
    try {
        console.log(`Server Running on the PORT ${PORT}`);
    } catch (error) {
        // PORT errors
        console.log(`Something went wrong! ${PORT} port!`);
    }
});

module.exports = app;