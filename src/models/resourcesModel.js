// importing packages
const mongoose = require('mongoose');

// Schema for Resources - Resource Information under (Create Project Sprint)
const ResourcesInfo_Schema = mongoose.Schema({
    associateName: {
        type: String,
        required: true
    },
    empId: {
        type: String,
        required: false
    },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "project-info" }]
});

const ResourcesInfoModel = mongoose.model('resources-info', ResourcesInfo_Schema);

module.exports = ResourcesInfoModel;