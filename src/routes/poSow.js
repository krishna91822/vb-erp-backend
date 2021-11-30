const express = require("express");
const router = express.Router();

const {
    createPoSow,
} = require("../controllers/poSowController");


router.post("/", createPoSow);


module.exports = router;
