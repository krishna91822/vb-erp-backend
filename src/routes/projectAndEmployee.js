//importing express
const express = require("express");
const ProjectEmployeeRouter = express.Router();

//importing from controller
const {
    createAllocations,
    getAllocations
} = require("../controller/projectEmployeeController");

// POST request
ProjectEmployeeRouter.post("/", createAllocations);

//GET Method
ProjectEmployeeRouter.get("/", getAllocations);

module.exports = ProjectEmployeeRouter;