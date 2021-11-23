//importing express
const express = require("express");
const router = express.Router();

//Defined Routes
const ProjectRouter = require("./projects");
const ResourceRouter = require("./resources")

//APIs
router.use("/projects", ProjectRouter);
router.use("/resources", ResourceRouter);

module.exports = router;