const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    vbProjectId: {
      type: String,
    },
    clientName: {
      type: String,
    },
    projectName: {
      type: String,
    },
    clientProjectManager: {
      type: String,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    clientProjectSponsor: {
      type: String,
    },
    clientFinanceController: {
      type: String,
    },
    clientPrimaryContact: {
      type: Number,
    },
    vbProjectManager: {
      type: String,
    },
    domainSector: {
      type: String,
    },
    vbProjectStatus: String,
  },
  { collection: "projectSchema" },
  { timestamps: true }
);

module.exports = mongoose.model("projectSchema", projectSchema);
