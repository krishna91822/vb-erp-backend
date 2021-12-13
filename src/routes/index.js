const express = require("express");
const router = express.Router();

const employeeRoutes = require("./employeeRoutes");
const ReviewRoutes = require("./ReviewRoutes");

router.use("/employees", employeeRoutes);
router.use("/reviews", ReviewRoutes);

module.exports = router;
