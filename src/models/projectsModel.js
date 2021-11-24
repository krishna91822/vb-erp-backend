// importing packages
const mongoose = require('mongoose');

// Schema for Projects - Project Information
const ProjectsInfo_Schema = mongoose.Schema({
    vbProjectId: {
        type: String,
    },
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
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: false
    },
    clientProjectSponsor: {
        type: String,
        required: true
    },
    clientFinanceController: {
        type: String,
        required: true
    },
    clientPrimaryContact: {
        type: Number,
        required: false
    },
    vbProjectManager: {
        type: String,
        required: true
    },
    vbProjectStatus: {
        type: String,
        required: false
    },
    domainSector: {
        type: String,
        required: false
    },
    resources: {
        type: Array,
    }
});


const ProjectsInfoModel = mongoose.model('projects-info', ProjectsInfo_Schema);

module.exports = ProjectsInfoModel;