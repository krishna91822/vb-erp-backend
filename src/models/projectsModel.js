// importing packages
const mongoose = require('mongoose');

// Schema for Projects - Project Information
const ProjectsInfo_Schema = mongoose.Schema({
    vbProjectId: String,
    clientName: {
        type: String,
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    clientProjectManager: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    contractUniqueID: {
        type: String,
        required: false
    },
    clientProjectSponser: {
        type: String,
        required: true
    },
    clientFinanceController: {
        type: String,
        required: true
    },
    clientPrimaryContact: Number,
    vbProjectManager: {
        type: String,
        required: true
    },
    domainSector: {
        type: String,
        required: false
    },
    vbProjectStatus: {
        type: String,
        required: false
    }
});

const ProjectsInfoModel = mongoose.model('projects-info', ProjectsInfo_Schema);

module.exports = ProjectsInfoModel;