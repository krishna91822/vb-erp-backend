const express = require("express");
const router = express.Router();

const { isAuthorized } = require("../middleware/auth");
const {
  getEmployees,
  storeEmployee,
  searchEmployees
} = require("../controllers/employeeController");

router.get("/", getEmployees);
router.post("/",storeEmployee);
router.get("/search",searchEmployees);
//create getrewards logic

module.exports = router;
