const express = require("express");
const router = express.Router();

const {
  getEmployee,
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getFilteredEmp,
} = require("./../controllers/employeeController");
const { restrictTo } = require("../middleware/rolesMiddleware");

router.route("/").get(getAllEmployees).post(
  // restrictTo(["USER", "SUPER_ADMIN"]),
  createEmployee
);

router.route("/filteremp").get(getFilteredEmp); //For PMO integration

router
  .route("/:id")
  .get(getEmployee)
  .patch(
    // restrictTo(["USER", "APPROVER", "LEADERSHIP", "HR_ADMIN", "SUPER_ADMIN"]),
    updateEmployee
  )
  .delete(
    // restrictTo(["HR_ADMIN", "SUPER_ADMIN"]),
    deleteEmployee
  );

module.exports = router;
