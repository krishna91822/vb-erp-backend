//importing express
const express = require("express");
const ProjectEmployeeRouter = express.Router();

//importing from controller
const {
  createAllocations,
  updateAllocation,
  deleteAllocation,
  getAllocations,
  // getSortedAllocations,
  getAllocationsOnBench,
  getSortedAllocationsOnBench,
  getTotalAllocationByEmpId,
} = require("../controllers/projectEmployeeController");

// POST request
ProjectEmployeeRouter.post("/", createAllocations);

// PUT request
ProjectEmployeeRouter.put("/", updateAllocation);

// DELETE request
ProjectEmployeeRouter.delete("/:id", deleteAllocation);

// GET request
ProjectEmployeeRouter.get("/", getAllocations);
// ProjectEmployeeRouter.get("/sorted/:fieldName", getSortedAllocations);

// GET request
ProjectEmployeeRouter.get("/onbench", getAllocationsOnBench);
ProjectEmployeeRouter.get(
  "/onbench/sorted/:fieldName",
  getSortedAllocationsOnBench
);

// GET request
ProjectEmployeeRouter.get("/totalallocation", getTotalAllocationByEmpId);

module.exports = ProjectEmployeeRouter;
