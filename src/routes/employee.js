const express = require("express");
const router = express.Router();

const { isAuthorized } = require("../middleware/auth");
const {
  getEmployees,
  storeEmployee
} = require("../controllers/employeeController");

router.get("/", getEmployees);
router.post("/",storeEmployee);

//create getrewards logic

module.exports = router;
