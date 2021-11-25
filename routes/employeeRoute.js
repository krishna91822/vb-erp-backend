const express = require("express");
const router = express.Router();
const employeeModel = require("../models/employeeModel");
const employeeController = require("../controllers/employeeController");

//Get all employee documents
router.get("/", employeeController.getAllEmployees);

//Create Employee (FOR ADMIN)
router.post("/", employeeController.createEmployee);

//Get Employee details (FOR READ ONLY)
router.get("/:empId", employeeController.getEmployee);

//Update Employee details
//This api will be called when the update request status is accepted
router.patch("/:empId", employeeController.updateEmployee);

module.exports = router;
