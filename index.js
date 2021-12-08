const express = require('express');
const app = express();
const port=3000;

require('./db/conn');

app.get('/',(req,res)=>{
    res.send("Hello World, Basic setup is running")
})

app.listen(port,()=>{
    console.log(`connection establised at ${port}`)
})
