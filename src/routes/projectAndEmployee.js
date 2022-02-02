//importing express
const express = require("express");
const ProjectEmployeeRouter = express.Router();
const { hasPermission } = require("../middleware/auth");

//importing from controller
const {
  createAllocations,
  updateAllocation,
  deleteAllocation,
  getAllocations,
  getSortedAllocations,
  getAllocationsOnBench,
  getSortedAllocationsOnBench,
  getTotalAllocationByEmpId,
  getFilteredEmployee,
  getManagers,
} = require("../controllers/projectEmployeeController");

// POST request
ProjectEmployeeRouter.post(
  "/",
  hasPermission("create_project_in_PMO"),
  createAllocations
);

// PUT request
ProjectEmployeeRouter.put(
  "/",
  hasPermission("update_project_in_PMO"),
  updateAllocation
);

// DELETE request
ProjectEmployeeRouter.delete(
  "/:id",
  hasPermission("create_project_in_PMO"),
  deleteAllocation
);

// GET request
ProjectEmployeeRouter.get(
  "/allocated",
  hasPermission("view_PMO_module"),
  getAllocations
);
ProjectEmployeeRouter.get(
  "/allocated/:fieldName",
  hasPermission("view_PMO_module"),
  getSortedAllocations
);

// GET request
ProjectEmployeeRouter.get(
  "/onbench",
  hasPermission("view_PMO_module"),
  getAllocationsOnBench
);
ProjectEmployeeRouter.get(
  "/onbench/:fieldName",
  hasPermission("view_PMO_module"),
  getSortedAllocationsOnBench
);

// GET request
ProjectEmployeeRouter.get(
  "/totalallocation",
  hasPermission("view_PMO_module"),
  getTotalAllocationByEmpId
);

/* ********************************** */
// Getting employee module's integrated data
ProjectEmployeeRouter.get(
  "/filteremp",
  hasPermission("view_PMO_module"),
  getFilteredEmployee
);
ProjectEmployeeRouter.get(
  "/managers",
  hasPermission("view_PMO_module"),
  getManagers
);

module.exports = ProjectEmployeeRouter;
