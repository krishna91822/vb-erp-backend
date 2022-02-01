const express = require("express");
const router = express.Router();
const { hasPermission } = require("../middleware/auth");

const {
  createAssignee,
  getAssigneeList,
  updateDetails,
  unassignEmployee,
} = require("../controllers/assigneeController");

router.post("/", hasPermission("upload_PO/SOW/contract"), createAssignee);
router.get("/:id", hasPermission("view_CMS"), getAssigneeList);
router.patch("/:id", hasPermission("upload_PO/SOW/contract"), updateDetails);
router.patch(
  "/unassign/:id",
  hasPermission("upload_PO/SOW/contract"),
  unassignEmployee
);

module.exports = router;
