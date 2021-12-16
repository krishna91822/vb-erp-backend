const express = require("express");
const EmployeeRouter = express.Router();
const {
    getFilteredEmp,
    getManagers,
} = require("../controllers/employeeController");

// GET request
EmployeeRouter.get("/filteremp", getFilteredEmp);

// GET request
EmployeeRouter.get("/empManagers", getManagers);

module.exports = EmployeeRouter;