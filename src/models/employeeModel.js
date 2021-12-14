const { string } = require("joi");
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const otherField = new mongoose.Schema({
  fieldName: {
    type: String,
    trim: true,
  },
  fieldValue: {
    type: String,
    trim: true,
  },
  fieldType: {
    type: String,
    trim: true,
  },
});

const employeeSchema = new mongoose.Schema(
  {
    empId: {
      type: Number,
      unique: true,
      // required: true,
    },
    empName: {
      type: String,
      required: [true, "A employee must have a name"],
      trim: true,
      maxlength: [30, "A employee name must be less or equal to 30 characters"],
      lowercase: true,
    },
    empEmail: {
      type: String,
      required: [true, "Please provide your email"],
      trim: true,
      unique: true,
    },
    empPersonalEmail: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    empPhoneNumber: {
      type: String,
      required: true,
    },
    empDoj: {
      type: Date,
      required: [true, "A employee must have a date of joining"],
    },
    empDob: {
      type: Date,
      required: [true, "A employee must have a date of birth"],
    },
    empPhoto: {
      type: String,
      trim: true,
    },
    empDepartment: {
      type: String,
      // lowercase: true,
      trim: true,
      default: "",
      required: true,
    },
    empDesignation: {
      type: String,
      trim: true,
      required: true,
      default: "",
    },
    empReportingManager: {
      type: String,
      trim: true,
      required: true,
      default: "",
    },
    empConnections: {
      type: Number,
      lowercase: true,
      trim: true,
      default: 0,
    },
    empHobbies: {
      type: Array,
      trim: true,
      default: [],
    },
    empAboutMe: {
      type: String,
      trim: true,
      default: "Something about me.",
      required: true,
    },
    empCurrentAddress: {
      type: String,
      lowercase: true,
      trim: true,
      default: "",
    },
    empResidentialAddress: {
      type: String,
      lowercase: true,
      trim: true,
      default: "",
    },
    empBand: {
      type: String,
      lowercase: true,
      trim: true,
      default: "",
    },
    empCtc: {
      type: Number,
      required: true,
      min: 0,
    },
    empGraduation: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    empGraduationUniversity: {
      type: String,
      lowercase: true,
      trim: true,
      default: "",
    },
    empPostGraduation: {
      type: String,
      trim: true,
      default: "",
    },
    empPostGraduationUniversity: {
      type: String,
      lowercase: true,
      trim: true,
      default: "",
    },
    empPrimaryCapability: {
      type: Array,
      trim: true,
      default: [],
    },
    empSkillSet: {
      type: Array,
      trim: true,
      default: [],
    },
    empCertifications: {
      type: Array,
      trim: true,
      default: [],
    },
    role: {
      type: String,
      uppercase: true,
      enum: {
        values: [
          "USER",
          "APPROVER",
          "LEADERSHIP",
          "HR_ADMIN",
          "FINANCE_ADMIN",
          "PMS_ADMIN",
          "SUPER_ADMIN",
        ],
        message:
          "role must be USER, APPROVER,LEADERSHIP,HR_ADMIN,FINANCE_ADMIN,PMS_ADMIN,SUPER_ADMIN, only",
      },
      default: "USER",
    },
    personalDetails: {
      type: [otherField],
      default: undefined,
    },
    professionalDetails: {
      type: [otherField],
      default: undefined,
    },
    skillsDetails: {
      type: [otherField],
      default: undefined,
    },
    slackMemId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

employeeSchema.plugin(AutoIncrement, { inc_field: "empId" });

//Employee model class
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = { Employee };
