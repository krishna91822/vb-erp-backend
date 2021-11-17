const express = require("express");
const router = express.Router();
const employeeModel = require("../models/employeeModel");
const employeeController = require("../controllers/employeeController");

//Get all employee documents
router.get("/", employeeController.get_all_employees);

//Create Employee (FOR ADMIN)
router.post("/", employeeController.create_employee);

//Get Employee details (FOR READ ONLY)
router.get("/:empId", employeeController.get_employee);

//Update Employee details
//This api will be called when the update request status is accepted
router.patch("/:empId", employeeController.update_employee);

module.exports = router;
