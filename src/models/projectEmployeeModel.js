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

// {
//     project_id: ,
//     resources: [{
//         empId: ,
//         allocation: 50 % ,
//         start_date: ,
//         end_date: ,
//     }, {
//         empId: ,
//         allocation: 50 % ,
//         start_date: ,
//         end_date: ,
//     }, {
//         empId: ,
//         allocation: 50 % ,
//         start_date: ,
//         end_date: ,
//     }]
// }