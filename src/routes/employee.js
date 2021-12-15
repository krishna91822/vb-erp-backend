const express = require("express");
const EmployeeRouter = express.Router();
const {
    storeEmployees,
    getFilteredEmp,
} = require("../controllers/employeeController");

EmployeeRouter.post("/", storeEmployees);

// GET request
EmployeeRouter.get("/filteremp", getFilteredEmp);

module.exports = EmployeeRouter;