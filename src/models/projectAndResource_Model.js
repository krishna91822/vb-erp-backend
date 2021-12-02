const mongoose = require("mongoose");

const projectAndResource = mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projectSchema",
    },

    empId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "resourceSchema",
    },
    allocationStartDate: {
        type: Date,
    },
    allocationEndDate: {
        type: Date,
    },
    allocationPercentage: {
        type: Number,
    },
    rackRate: {
        type: Number,
    },
    projectAllocated: {
        type: String,
    },
});

module.exports = mongoose.model("projectAndResource", projectAndResource);

// {
//     "project_id". : "",
//     "resources" : [
//     {
//     empId : ,
//     allocation: 50%,
//     start_date : ,
//     end_date : ,
//     },
//     empId : ,
//     allocation: 50%,
//     start_date : ,
//     end_date : ,
//     },empId : ,
//     allocation: 50%,
//     start_date : ,
//     end_date : ,
//     }
//     ]
//     }