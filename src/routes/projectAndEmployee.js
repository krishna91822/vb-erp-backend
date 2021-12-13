//importing express
const express = require("express");
const ProjectEmployeeRouter = express.Router();

//importing from controller
const {
  createAllocations,
  updateAllocation,
  deleteAllocation,
  getAllocations,
  getAllocationsOnBench,
  getTotalAllocationByEmpId,
} = require("../controller/projectEmployeeController");

// POST request
ProjectEmployeeRouter.post("/", createAllocations);

// PUT request
ProjectEmployeeRouter.put("/:projectId", updateAllocation);

// DELETE request
ProjectEmployeeRouter.delete("/:id", deleteAllocation);

// GET request
ProjectEmployeeRouter.get("/", getAllocations);

// GET request
ProjectEmployeeRouter.get("/onbench", getAllocationsOnBench);

// GET request
ProjectEmployeeRouter.get("/totalallocation/", getTotalAllocationByEmpId);

module.exports = ProjectEmployeeRouter;
