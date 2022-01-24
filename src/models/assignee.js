const mongoose = require("mongoose");
const assigneeSchema = mongoose.Schema({
  PO_Id: {
    type: String,
    required: [true, "PO Id is required"],
  },
  Employee_Id: {
    type: String,
    required: [true, "Employee Id is required"],
  },
  Employee_Name: {
    type: String,
    required: [true, "Employee Id is required"],
  },
  Status: {
    type: String,
  },
  Allocation_Rate: {
    type: Number,
    required: [true],
  },
  Start_Date: {
    type: Date,
  },
  End_Date: {
    type: Date,
  },
});

const assigneeModel = mongoose.model("Assignee", assigneeSchema);

module.exports = assigneeModel;
