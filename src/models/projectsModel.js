// importing packages
const mongoose = require('mongoose');
const slugify = require('slugify');

// Schema for Projects - Project Information
const ProjectsInfo_Schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
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
    slug: {
        type: String,
        required: false,
        unique: true
    },
    resources: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "resource-info"
    }]
}, { timestamps: true });

ProjectsInfo_Schema.pre("save", function(next) {
    const project = this;

    if (project.projectName && project.clientName) {
        project.slug = slugify(
            project.projectName.split(" ").join("-") + "-" +
            project.clientName.split(" ").join("-"), { lower: true, strict: true }
        );
    }
    next();
});

const ProjectsInfoModel = mongoose.model('projects-info', ProjectsInfo_Schema);

module.exports = ProjectsInfoModel;