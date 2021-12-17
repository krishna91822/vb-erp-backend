const mongoose = require("mongoose");

//Creating PO/SOW Schema
const purchaseOrderSchema = mongoose.Schema({
  Project_Id: {
    type: String,
    required: [true, "Project Id is required"],
  },
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
    type: String,
    required: [true, "client sponser is required"],
  },
  Client_Finance_Controller: {
    type: String,
    required: [true, "client finance controller is required"],
  },
  Targetted_Resources: {
    type: Object,
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
  POSOW_endDate: {
    type: Date,
    required: [true, "enddate is required"],
  },
  Remarks: {
    type: String,
  },
  Created_At: {
    type: Date,
    required: true,
    default: Date.now,
  },
  Updated_At: {
    type: Date,
  },
});

//Creating purchase order collection with purchase order schema
const purchaseOrderModel = mongoose.model(
  "purchase_orders",
  purchaseOrderSchema
);

//exporting collection
module.exports = purchaseOrderModel;
