const express = require("express");
const {
  getInvoiceDetails,
  getInvoiceDetailsById,
  newInvoice,
  getRelatedInvoices,
  updateInvoice,
} = require("../controllers/invoicecontroller");

const router = express.Router();

router.post("/", newInvoice);
router.get("/sort/:data", getInvoiceDetails);
router.get("/:id", getInvoiceDetailsById);
router.get("/", getRelatedInvoices);
router.patch("/:id", updateInvoice);

module.exports = router;
