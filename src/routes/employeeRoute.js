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
} = require("../controllers/employeeController");

router.get(
  "/qr",
  hasPermission([
    "user",
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  generateQR
);
router.get(
  "/designations",
  hasPermission([
    "user",
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getDesignations
);
router.get(
  "/departments",
  hasPermission([
    "user",
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getDepartments
);
router.get(
  "/:id",
  hasPermission([
    "user",
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getEmployee
);
router.patch(
  "/:id",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  updateEmployee
);
router.delete(
  "/:id",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  deleteEmployee
);
router.get(
  "/",
  hasPermission([
    "user",
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getAllEmployees
);
router.post("/", hasPermission(["super_admin", "hr_admin"]), createEmployee);
router.get(
  "/reward/employee",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getEmployeesRR
);
router.get(
  "/rewars/employeesearch",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  searchEmployeesRR
);

module.exports = router;
