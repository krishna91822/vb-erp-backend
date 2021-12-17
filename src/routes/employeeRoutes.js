const express = require("express");
const router = express.Router();

const {
  getEmployee,
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getFilteredEmp,
  generateQR,
  getDesignations,
  getDepartments,
  getEmployeesRR,
  searchEmployeesRR,
} = require("./../controllers/employeeController");
const { restrictTo } = require("../middleware/rolesMiddleware");

// router.route("/").get(getAllEmployees).post(
//   // restrictTo(["USER", "SUPER_ADMIN"]),
//   createEmployee
// );
router.get("/filteremp", getFilteredEmp);
router.get("/qr", generateQR);
router.get("/designations", getDesignations);
router.get("/departments", getDepartments);
router.get("/:id", getEmployee);
router.patch("/:id", updateEmployee);
router.get("/reward/employee", getEmployeesRR);
router.get("/rewars/employeesearch", searchEmployeesRR);
router.delete("/:id", deleteEmployee);
router.get("/", getAllEmployees);
router.post("/", createEmployee);

module.exports = router;
