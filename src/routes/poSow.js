const express = require("express");
const router = express.Router();
const { hasPermission } = require("../middleware/auth");

const {
  createPoSow,
  getPoDeatil,
  getSortedPoList,
  updatePODetais,
  getClients,
  getProjects,
  getDetails,
} = require("../controllers/poSowController");

router.post(
  "/",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "finance_admin",
    "pms_admin",
  ]),
  createPoSow
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
  getPoDeatil
);
router.get(
  "/sort/:fieldName",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getSortedPoList
);
router.get(
  "/capturePO/clients",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getClients
);
router.get(
  "/capturePO/clients/:clientName",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getProjects
);
router.get(
  "/capturePO/details",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getDetails
);
router.patch(
  "/:id",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "finance_admin",
    "pms_admin",
  ]),
  updatePODetais
);
// router.patch("/status/:id", updatePOStatus);

module.exports = router;
