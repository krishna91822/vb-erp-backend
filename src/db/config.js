const mongoose = require('mongoose');

// database connection
const db = mongoose.connection;

// database connection
mongoose.connect("mongodb://127.0.0.1:27017/pmo");

//successful connection method
db.once("open", function () {
    console.log("PMO database connected successfully.");
});

//successful connection method
db.on("error", () => console.log(`Database connection error`));
