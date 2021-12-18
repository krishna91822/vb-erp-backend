const express = require("express");
const router = express.Router();

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

router.get("/qr", generateQR);
router.get("/designations", getDesignations);
router.get("/departments", getDepartments);
router.get("/:id", getEmployee);
router.patch("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
router.get("/", getAllEmployees);
router.post("/", createEmployee);
router.get("/reward/employee", getEmployeesRR);
router.get("/rewars/employeesearch", searchEmployeesRR);

module.exports = router;