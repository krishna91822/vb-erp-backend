//importing express
const express = require("express");
const ProjectEmployeeRouter = express.Router();

//importing from controller
const {
  createAllocations,
  getAllocations,
  deleteAllocation,
  updateAllocation,
} = require("../controller/projectEmployeeController");

// POST request
ProjectEmployeeRouter.post("/", createAllocations);

// GET request
ProjectEmployeeRouter.get("/", getAllocations);

// DELETE request
ProjectEmployeeRouter.delete("/:id", deleteAllocation);

// PUT request
ProjectEmployeeRouter.put("/:id", updateAllocation);

module.exports = ProjectEmployeeRouter;
