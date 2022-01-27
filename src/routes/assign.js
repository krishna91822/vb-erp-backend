const express = require("express");
const router = express.Router();
const { hasPermission } = require("../middleware/auth");

const {
  createAssignee,
  getAssigneeList,
  updateDetails,
  unassignEmployee,
} = require("../controllers/assigneeController");

router.post(
  "/",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  createAssignee
);
router.get(
  "/:id",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getAssigneeList
);
router.patch(
  "/:id",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  updateDetails
);
router.patch(
  "/unassign/:id",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  unassignEmployee
);

module.exports = router;
