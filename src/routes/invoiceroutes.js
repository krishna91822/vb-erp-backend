const express = require("express");
const {
  getInvoiceDetails,
  getInvoiceDetailsById,
  newInvoice,
  getRelatedInvoices,
  updateInvoice,
} = require("../controllers/invoicecontroller");
const { hasPermission } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "finance_admin",
    "pms_admin",
  ]),
  newInvoice
);
router.get(
  "/sort/:data",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getInvoiceDetails
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
  getInvoiceDetailsById
);
router.get(
  "/",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getRelatedInvoices
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
  updateInvoice
);

module.exports = router;
