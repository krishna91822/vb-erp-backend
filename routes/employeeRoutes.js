const express = require("express");

const {
  getEmployee,
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("./../controllers/employeeController");
const { protect, restrictTo } = require("./../controllers/authController");

const router = express.Router();

// router.post("/signup", authController.signup);
// router.post("/login", authController.login);

router
  .route("/")
  .get(protect, getAllEmployees) //Get all employee documents
  .post(protect, restrictTo(["HR_ADMIN", "SUPER_ADMIN"]), createEmployee); //Create Employee (FOR ADMIN)

router
  .route("/:id")
  .get(protect, getEmployee) //Get Employee details (FOR READ ONLY)
  .patch(protect, updateEmployee) //Update Employee details
  .delete(protect, restrictTo(["HR_ADMIN", "SUPER_ADMIN"]), deleteEmployee); //delete Employee documents

module.exports = router;
