const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const validator = require("validator");

const addressSchema = new mongoose.Schema(
  {
    empAddressLineOne: {
      type: String,
      trim: true,
    },
    empAddressCity: {
      type: String,
      trim: true,
    },
    empAddressState: {
      type: String,
      trim: true,
    },
    empAddressPinCode: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

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

const projectDetails = new mongoose.Schema({
  projectName: {
    type: String,
    trim: true,
  },
  projectSkill: {
    type: Array,
    default: [],
  },
  projectDescription: {
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
    empPersonalEmail: {
      type: String,
      trim: true,
      required: true,
    },
    empDoj: {
      type: Date,
      required: [true, "A employee must have a date of joining"],
    },
    empDob: {
      type: Date,
    },
    empDepartment: {
      type: String,
      lowercase: true,
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
    empPhoto: {
      type: String,
      trim: true,
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
    empCurrentAddress: addressSchema,
    empResidentialAddress: addressSchema,
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
          "ADMIN",
        ],
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
    project: {
      type: [projectDetails],
      default: undefined,
    },
    slackMemId: {
      type: String,
      default: undefined,
    },
    empPhoneNumber: {
      type: String,
    },
    empCtc: {
      type: Number,
      min: 0,
    },
  },
  { _id: false }
);

const ReviewSchema = mongoose.Schema(
  {
    reqId: {
      type: Number,
      unique: true,
    },
    reqName: {
      required: true,
      type: String,
    },
    message: {
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
