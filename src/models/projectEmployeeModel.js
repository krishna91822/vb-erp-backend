const mongoose = require("mongoose");

const projectAndEmployee = mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projectSchema",
  },
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employeeSchema",
  },
  primaryCapiblities:{
    type:Array
  },
  allocationStartDate: {
    type: String,
  },
  allocationEndDate: {
    type: String,
  },
  allocationPercentage: {
    type: Number,
  },
  rackRate: {
    type: Number,
  },
});

module.exports = mongoose.model("projectAndEmployee", projectAndEmployee);
