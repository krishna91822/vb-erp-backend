const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
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
        type: Date,
    },
    endDate: {
        type: Date,
    },
    clientProjectSponser: {
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
    // resources: {
    //     type: Array
    // }
}, { timestamps: true });

module.exports = mongoose.model("projectSchema", projectSchema);