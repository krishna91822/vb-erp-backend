const express = require("express");
const {
  getInvoiceDetails,
  getInvoiceDetailsById,
  newInvoice,
} = require("../controllers/invoicecontroller");

const Invoice = require("../models/invoicemodel");

const router = express.Router();

router.post("/", newInvoice);
router.get("/sort/:data", getInvoiceDetails);
router.get("/:id", getInvoiceDetailsById);

module.exports = router;
