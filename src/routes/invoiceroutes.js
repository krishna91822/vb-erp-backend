const express = require('express');
const { getInvoiceDetails, getInvoices, getInvoiceDetailsById, newInvoice } = require('../controllers/invoicecontroller');

const Invoice = require('../models/invoicemodel')

const router = express.Router();


router.post("/", newInvoice)
router.get("/sort/:data", getInvoiceDetails);
router.get("/", getInvoices);
router.get("/:id", getInvoiceDetailsById);




module.exports = router;