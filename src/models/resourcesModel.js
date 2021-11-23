// importing packages
const mongoose = require('mongoose');

// Schema for Resources - Resource Information under (Create Project Sprint)
const ResourcesInfo_Schema = mongoose.Schema({
    associateName: {
        type: String,
        required: true
    },
    allocationStartDate: {
        type: Date,
        required: true
    },
    allocationEndDate: {
        type: Date,
        required: true
    },
    allocationPercentage: {
        type: Number,
        required: true
    },
    rackRate: {
        type: Number,
        required: true
    },
    empId: {
        type: String,
        required: false
    },
    projectAllocated: String
});

const ResourcesInfoModel = mongoose.model('resources-info', ResourcesInfo_Schema);

module.exports = ResourcesInfoModel;