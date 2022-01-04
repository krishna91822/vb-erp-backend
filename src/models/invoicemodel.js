const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  PO_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "purchase_orders",
    required: [true, "User-ID is required"],
  },
  client_sponsor: {
    type: String,
    required: [true, "client sponsor is required"],
  },
  client_finance_controller: {
    type: String,
    required: [true, "client finance controller is required"],
  },
  invoice_raised: {
    type: String,
    enum: ["Yes", "No"],
    default: "No",
  },
  invoice_raised_on: {
    type: Date,
    default: null,
  },
  invoice_received: {
    type: String,
    enum: ["Yes", "No"],
    default: "No",
  },
  invoice_amount_received: {
    type: Number,
    default: null,
  },
  vb_bank_account: {
    type: String,
    default: null,
  },
  amount_received_on: {
    type: Date,
    default: null,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
  Remarks: {
    type: String,
    default: null,
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
