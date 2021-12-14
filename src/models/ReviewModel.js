const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const validator = require("validator");

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

const employeeSchemaForReview = new mongoose.Schema(
  {
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
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
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
      lowercase: true,
      trim: true,
      default: "",
    },
    empDesignation: {
      type: String,
      lowercase: true,
      trim: true,
      default: "",
    },
    empReportingManager: {
      type: String,
      lowercase: true,
      trim: true,
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
      lowercase: true,
      trim: true,
      default: [],
    },
    empAboutMe: {
      type: String,
      lowercase: true,
      trim: true,
      default: "Something about me.",
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
    empGraduation: {
      type: String,
      lowercase: true,
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
      lowercase: true,
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
      lowercase: true,
      trim: true,
      default: [],
    },
    empSkillSet: {
      type: Array,
      lowercase: true,
      trim: true,
      default: [],
    },
    empCertifications: {
      type: Array,
      lowercase: true,
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
      default: "employee",
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
  },
  { _id: false }
);

const ReviewSchema = mongoose.Schema(
  {
    reqId: {
      type: Number,
    },
    reqName: {
      required: true,
      type: String,
    },
    reqType: {
      required: true,
      enum: ["profile-creation", "profile-update"],
      type: String,
    },
    status: {
      type: String,
      enum: ["accepted", "pending", "rejected"],
      default: "pending",
    },
    employeeDetails: {
      type: employeeSchemaForReview,
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.plugin(AutoIncrement, { inc_field: "reqId" });

//Review model class
const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
