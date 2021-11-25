const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  empName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  empId: {
    type: String,
    required: true,
    unique: true,
  },
  empEmail: {
    type: String,
    required: true,
    unique: true,
  },
  empDoj: {
    type: String,
    required: true,
  },
  empDepartment: {
    type: String,
    required: true,
  },
  empDesignation: {
    type: String,
    required: true,
  },
  empBand: {
    type: String,
    required: true,
  },
  empCtc: {
    type: Number,
    required: true,
    min: 0,
  },
  empReportingManager: {
    type: String,
    required: true,
  },
  empGraduation: {
    type: String,
    required: false,
    default: "",
  },
  empPostGraduation: {
    type: String,
    required: false,
    default: "",
  },
  empPersonalEmail: {
    type: String,
    required: true,
    unique: true,
  },
  empPhoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  empDob: {
    type: String,
    required: true,
  },
  empAboutMe: {
    type: String,
    required: true,
  },
  empHobbies: {
    type: Array,
    required: false,
    default: [],
  },
  empPrimaryCapability: {
    type: Array,
    required: false,
    default: [],
  },
  empSkillSet: {
    type: Array,
    required: false,
    default: [],
  },
  empCertifications: {
    type: Array,
    required: false,
    default: [],
  },
  empRole: {
    type: String,
    required: true,
    enum: [
      "USER",
      "APPROVER",
      "LEADERSHIP",
      "HR_ADMIN",
      "FINANCE_ADMIN",
      "PMS_ADMIN",
      "SUPER_ADMIN",
    ],
  },
});

employeeSchema.set("validateBeforeSave", true);
module.exports = mongoose.model("employee", employeeSchema, "employees");
