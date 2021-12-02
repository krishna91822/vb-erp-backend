const mongoose = require("mongoose");

const resourcesSchema = new mongoose.Schema({
    // resources: [{
    //     type: mongoose.Schema.Types.Array,
    //     ref: "projectSchema"
    // }],
    associateName: {
        type: String,
    },
    allocation: String,
    rackRate: String,
    empId: {
        type: String,
    },
    totalAllocation: {
        type: Number,
    },
}, { timestamps: true });

module.exports = mongoose.model("resourceSchema", resourcesSchema);