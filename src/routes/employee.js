const express = require("express");
const EmployeeRouter = express.Router();
const {
  storeEmployees,
  getFilteredEmp,
} = require("../controller/employeeController");

EmployeeRouter.post("/", storeEmployees);

// GET request
EmployeeRouter.get("/filteremp", getFilteredEmp);

module.exports = EmployeeRouter;
