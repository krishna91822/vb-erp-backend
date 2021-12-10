//importing express
const express = require("express");
const router = express.Router();

//Defined Routes
const ProjectRouter = require("./projects");
const EmployeeRouter = require("./employee");
const ProjectEmployeeRouter = require("./projectAndEmployee");
const cimsRoutes = require("./cims");
const ClientRouter = require("./clients");

//APIs
router.use("/projects", ProjectRouter);
router.use("/employees", EmployeeRouter);
router.use("/allocations", ProjectEmployeeRouter);
router.use("/cims", cimsRoutes);
router.use("/clients", ClientRouter);

module.exports = router;