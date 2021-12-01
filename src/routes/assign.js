const express = require("express");
const router = express.Router();

const {
    createAssignee,
} = require("../controllers/assigneeController");


router.post("/", createAssignee);



module.exports = router;
