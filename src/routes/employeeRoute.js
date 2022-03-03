const express = require("express");
const router = express.Router();
const { hasPermission } = require("../middleware/auth");

const {
  getEmployee,
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  generateQR,
  getDesignations,
  getDepartments,
  getEmployeesRR,
  searchEmployeesRR,
  importEmployees,
} = require("../controllers/employeeController");

router.get("/qr", hasPermission("view_employee_dashboard"), generateQR);
router.get(
  "/designations",
  hasPermission("view_employee_dashboard"),
  getDesignations
);
router.get(
  "/departments",
  hasPermission("view_employee_dashboard"),
  getDepartments
);
router.get("/:id", hasPermission("view_employee_dashboard"), getEmployee);
router.patch("/:id", hasPermission("edit_employee_dashboard"), updateEmployee);
router.delete(
  "/:id",
  hasPermission("create_employee_dashboard"),
  deleteEmployee
);
router.get("/", hasPermission("view_employee_dashboard"), getAllEmployees);
router.post("/", hasPermission("create_employee_dashboard"), createEmployee);
router.get(
  "/reward/employee",
  hasPermission("view_employee_dashboard"),
  getEmployeesRR
);
router.get(
  "/rewars/employeesearch",
  hasPermission("view_employee_dashboard"),
  searchEmployeesRR
);
router.post(
  "/import",
  hasPermission("create_employee_dashboard"),
  importEmployees
);

module.exports = router;
