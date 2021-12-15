const express = require("express");
const EmployeeRouter = express.Router();
const {
    getFilteredEmp,
    getVbManagers,
} = require("../controllers/employeeController");

// GET request
EmployeeRouter.get("/filteremp", getFilteredEmp);

// GET request
EmployeeRouter.get("/empManagers", getVbManagers);

module.exports = EmployeeRouter;