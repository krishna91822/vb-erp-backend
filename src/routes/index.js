//importing express
const express = require("express");
const router = express.Router();

//Defined Routes
const ProjectRouter = require("./projects");
const ResourceRouter = require("./resources");
const EmployeeRouter = require("./employee");

//APIs
router.use("/projects", ProjectRouter);
router.use("/resources", ResourceRouter);
router.use("/employees", EmployeeRouter);

module.exports = router;