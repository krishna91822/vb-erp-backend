const express = require("express");
const {
  getInvoiceDetails,
  getInvoiceDetailsById,
  newInvoice,
  getRelatedInvoices,
  updateInvoice,
  getBankAccount,
} = require("../controllers/invoicecontroller");
const { hasPermission } = require("../middleware/auth");

const router = express.Router();

router.post("/", hasPermission("upload_invoice"), newInvoice);
router.get("/bankAccount", hasPermission("view_invoice"), getBankAccount);
router.get("/sort/:data", hasPermission("view_invoice"), getInvoiceDetails);
router.get("/:id", hasPermission("view_invoice"), getInvoiceDetailsById);
router.get("/", hasPermission("view_invoice"), getRelatedInvoices);
router.patch("/:id", hasPermission("upload_invoice"), updateInvoice);

module.exports = router;
