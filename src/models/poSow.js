const mongoose = require("mongoose");

//Creating PO/SOW Schema
const purchaseOrderSchema = mongoose.Schema({
  Client_Name: {
    trim: true,
    type: String,
    required: [true, "client name is required"],
  },
  Project_Name: {
    trim: true,
    type: String,
    required: [true, "project name is required"],
  },
  Client_Sponser: {
    type: [{ type: String }],
    required: [true, "client sponser is required"],
  },
  Client_Finance_Controller: {
    type: [{ type: String }],
    required: [true, "client finance controller is required"],
  },
  Targetted_Resources: {
    type: [{ type: String }],
    required: [true, "targetted Resources is required"],
  },
  Status: {
    type: String,
    enum: ["Rejected", "Pending", "Accepted", "Closed", "Drafted"],
    required: [true, "status is required"],
  },
  Type: {
    type: String,
    enum: ["PO", "SOW"],
    required: [true, "type is required"],
  },
  PO_Number: {
    trim: true,
    type: String,
    required: [true, "po number is required"],
  },
  PO_Amount: {
    trim: true,
    type: Number,
    required: [true, "po amount is required"],
  },
  Currency: {
    type: String,
    required: [true, "currency is required"],
  },
  Document_Name: {
    trim: true,
    type: String,
    required: [true, "document name is required"],
  },
  Document_Type: {
    type: String,
    required: [true, "document type is required"],
  },
  POSOW_endDate: {
    type: Date,
    required: [true, "enddate is required"],
  },
  Remarks: {
    type: String,
  },
});

//Creating purchase order collection with purchase order schema
const purchaseOrderModel = mongoose.model(
  "purchase_orders",
  purchaseOrderSchema
);

//exporting collection
module.exports = purchaseOrderModel;
