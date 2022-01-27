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
  hasPermission(["approver", "leader", "super_admin", "pms_admin"]),
  createAllocations
);

// PUT request
ProjectEmployeeRouter.put(
  "/",
  hasPermission(["approver", "leader", "super_admin", "pms_admin"]),
  updateAllocation
);

// DELETE request
ProjectEmployeeRouter.delete(
  "/:id",
  hasPermission(["approver", "leader", "super_admin", "pms_admin"]),
  deleteAllocation
);

// GET request
ProjectEmployeeRouter.get(
  "/allocated",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getAllocations
);
ProjectEmployeeRouter.get(
  "/allocated/:fieldName",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getSortedAllocations
);

// GET request
ProjectEmployeeRouter.get(
  "/onbench",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getAllocationsOnBench
);
ProjectEmployeeRouter.get(
  "/onbench/:fieldName",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getSortedAllocationsOnBench
);

// GET request
ProjectEmployeeRouter.get(
  "/totalallocation",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getTotalAllocationByEmpId
);

/* ********************************** */
// Getting employee module's integrated data
ProjectEmployeeRouter.get(
  "/filteremp",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getFilteredEmployee
);
ProjectEmployeeRouter.get(
  "/managers",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getManagers
);

module.exports = ProjectEmployeeRouter;
