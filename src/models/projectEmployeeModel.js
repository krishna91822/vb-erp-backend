const mongoose = require("mongoose");

const projectAndEmployee = mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projectSchema",
  },
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
<<<<<<< HEAD
  empPrimaryCapiblities: {
=======
  primaryCapiblities: {
>>>>>>> 71f2ffda8f75b5f7c80e13cf28ae91f37b43e83d
    type: Array,
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
