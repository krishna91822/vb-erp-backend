//importing express
const express = require("express");
const router = express.Router();

//Defined Routes
const ProjectRouter = require("./projects");
const EmployeeRouter = require("./employee");
const ProjectEmployeeRouter = require("./projectAndEmployee");

//APIs
router.use("/projects", ProjectRouter);
router.use("/employees", EmployeeRouter);
router.use("/allocations", ProjectEmployeeRouter);

module.exports = router;
