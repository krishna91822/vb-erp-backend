const mongoose = require('mongoose');

const DB = "mongodb://127.0.0.1:27017/pmo"

mongoose.connect(DB).then(()=>{
    console.log("database connected successful");
}).catch((e)=>{
    console.log("no connection");
});