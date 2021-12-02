//importing packages
const express = require("express");
const EmployeeRouter = express.Router();

//importing from controller
const {
    storeEmployees,
    getEmployees,
    getFilterEmployees
} = require("../controller/employeeController");

// POST request
EmployeeRouter.post("/", storeEmployees);

// GET request
EmployeeRouter.get('/', getEmployees);

// GET request for filtering the drop-down options
EmployeeRouter.get('/', getFilterEmployees);

module.exports = EmployeeRouter;