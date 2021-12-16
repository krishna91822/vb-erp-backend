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
<<<<<<< HEAD
=======
    required: [true, "invoice raised is required"],
  },
  invoice_received: {
    type: String,
    enum: ["Yes", "No"],
>>>>>>> 678272975343fdff469781369b8f64e3e16a46f7
    required: [true, "invoice raised is required"],
  },
  invoice_amount_received: {
    type: Number,
  },
  vb_bank_account: {
    type: String,
  },
  amount_received_on: {
    type: Date,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at:{
    type:Date
  }
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
