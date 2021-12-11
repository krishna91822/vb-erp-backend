//importing packages
const express = require("express");
const EmployeeRouter = express.Router();

//importing from controller
const {

  storeEmployees,
  getFilteredEmp,
  // getEmployees,
  // getFilterEmployees,
} = require("../controller/employeeController");

// POST request
EmployeeRouter.post("/", storeEmployees);

// GET request
// EmployeeRouter.get('/', getEmployees);

// GET request for filtering the drop-down options
// EmployeeRouter.get("/", getFilterEmployees);
EmployeeRouter.get("/empfilter", getFilteredEmp);

module.exports = EmployeeRouter;
