const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/ReviewController");
const EmployeeController = require("../controllers/employeeController");

// Get all Request documents
router.get("/", ReviewController.GetReviews);

// Create Request
router.post("/", EmployeeController.createEmployee);

module.exports = router;
