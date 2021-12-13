const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    empId: String,
    empName: String,
}, { timestamps: true });

module.exports = mongoose.model("employeeSchema", employeeSchema);