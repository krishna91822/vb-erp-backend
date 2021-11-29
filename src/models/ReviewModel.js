const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ReviewSchema = mongoose.Schema({
  ID: {
    required: true,
    type: Number,
  },
  ReqId: {
    required: true,
    type: String,
  },
  ReqName: {
    required: true,
    type: String,
  },
  ReqOn: {
    required: true,
    type: String,
  },
  ReqType: {
    required: true,
    enum: ["Profile Create", "Profile Update"],
    type: String,
  },
  Status: {
    type: String,
    enum: ["Accepted", "Pending", "Rejected"],
    default: "Pending",
  },
  empName: {
    type: String,
    maxlength: 100,
  },
  empId: {
    type: String,
    unique: true,
  },
  empEmail: {
    type: String,
    unique: true,
  },
  empDoj: {
    type: String,
  },
  empDepartment: {
    type: String,
  },
  empDesignation: {
    type: String,
  },
  empBand: {
    type: String,
  },
  empCtc: {
    type: Number,
    min: 0,
  },
  empReportingManager: {
    type: String,
  },
  empGraduation: {
    type: String,
    default: "",
  },
  empPostGraduation: {
    type: String,
    default: "",
  },
  empPersonalEmail: {
    type: String,
    unique: true,
  },
  empPhoneNumber: {
    type: String,
    unique: true,
  },
  empDob: {
    type: String,
  },
  empAboutMe: {
    type: String,
  },
  empHobbies: {
    type: Array,
    default: [],
  },
  empPrimaryCapability: {
    type: Array,
    default: [],
  },
  empSkillSet: {
    type: Array,
    default: [],
  },
  empCertifications: {
    type: Array,
    default: [],
  },
  empRole: {
    type: String,
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
ReviewSchema.plugin(AutoIncrement, { inc_field: "ID" });
//ReviewSchema.set("validateBeforeSave", true);

module.exports = mongoose.model("myreviews", ReviewSchema);
