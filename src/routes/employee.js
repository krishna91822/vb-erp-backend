//importing packages
const express = require("express");
const EmployeeRouter = express.Router();

//importing from controller
const {

  storeEmployees,
  getFilteredEmp,
} = require("../controller/employeeController");

// POST request
EmployeeRouter.post("/", storeEmployees);

// GET request
EmployeeRouter.get("/filteremp", getFilteredEmp);

module.exports = EmployeeRouter;
