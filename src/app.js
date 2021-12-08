// importing packages
const express = require('express');
require('./db/config');
const cors = require('cors'); // importing middleware packages

const app = express();

var corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

// PORT 
const PORT = 3030;

// Routes
const router = require('./routes/index');
app.use(express.json());

// Home Page
app.get('/', (req, res) =>
    res.send(
        `<h1 style="text-align: center; font-family: Ubuntu">
            Welcome to PMO API
        </h1>`)
);
app.use(router);

// Server
app.listen(PORT, () => {
    try {
        console.log(`Server Running on the PORT ${PORT}`);
    }
    // PORT errors
    catch (error) {
        console.log(`Something went wrong! ${PORT} port!`);
    }
});

module.exports = app;