const express = require("express");

const {
  getEmployee,
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("./../controllers/employeeController");
const { isAuthorized } = require("../middleware/auth");
const { restrictTo } = require("../middleware/rolesMiddleware");

const router = express.Router();

// router.post("/signup", authController.signup);
// router.post("/login", authController.login);

router
  .route("/")
  .get(isAuthorized, getAllEmployees) //Get all employee documents
  .post(isAuthorized, restrictTo(["HR_ADMIN", "SUPER_ADMIN"]), createEmployee); //Create Employee (FOR ADMIN)

router
  .route("/:id")
  .get(isAuthorized, getEmployee) //Get Employee details (FOR READ ONLY)
  .patch(
    isAuthorized,
    restrictTo(["USER", "APPROVER", "LEADERSHIP", "HR_ADMIN", "SUPER_ADMIN"]),
    updateEmployee
  ) //Update Employee details
  .delete(
    isAuthorized,
    restrictTo(["HR_ADMIN", "SUPER_ADMIN"]),
    deleteEmployee
  ); //delete Employee documents

module.exports = router;
