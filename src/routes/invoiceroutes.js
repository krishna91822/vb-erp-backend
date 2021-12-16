const express = require("express");
const {
  getInvoiceDetails,
  getInvoiceDetailsById,
  newInvoice,
  getRelatedInvoices,
} = require("../controllers/invoicecontroller");

const router = express.Router();

router.post("/", newInvoice);
router.get("/sort/:data", getInvoiceDetails);
router.get("/:id", getInvoiceDetailsById);
router.get("/", getRelatedInvoices);

module.exports = router;
