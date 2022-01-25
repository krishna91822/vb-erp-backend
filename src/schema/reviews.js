const Joi = require("joi");
//Joi.objectId = require("joi-objectid")(Joi);

const reviewSchema = Joi.object({
  reqName: Joi.string().required(),
  reqEmail: Joi.string().email(),
  reqType: Joi.string().valid("profile-creation", "profile-update").required(),
  status: Joi.string().valid("accepted", "rejected", "pending"),
  message: Joi.string(),
  employeeDetails: Joi.object({
    _id: Joi.any(),
    empId: Joi.string().allow(null, "").allow(null, ""),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    count: Joi.number().allow(null, ""),
    empName: Joi.string().max(30).required(),
    empEmail: Joi.string().email().required(),
    empPersonalEmail: Joi.string().email().required(),
    empDoj: Joi.string().allow(null, "").required(),
    empDob: Joi.string().allow(null, ""),
    empDepartment: Joi.string().required(),
    empDesignation: Joi.string().required(),
    empReportingManager: Joi.string().allow(null, ""),
    empPhoto: Joi.string().allow(null, ""),
    empConnections: Joi.number().allow(null, ""),
    empHobbies: Joi.array(),
    empAboutMe: Joi.string().allow(null, ""),
    empBand: Joi.string().allow(null, ""),
    empGraduation: Joi.string().allow(null, ""),
    empGraduationUniversity: Joi.string().allow(null, ""),
    empPostGraduation: Joi.string().allow(null, ""),
    empPostGraduationUniversity: Joi.string().allow(null, ""),
    empPrimaryCapability: Joi.array(),
    empSkillSet: Joi.array(),
    empCertifications: Joi.array(),
    empCurrentAddress: Joi.any(),
    empResidentialAddress: Joi.any(),
    role: Joi.string().valid(
      "USER",
      "APPROVER",
      "LEADERSHIP",
      "HR_ADMIN",
      "FINANCE_ADMIN",
      "PMS_ADMIN",
      "SUPER_ADMIN",
      "ADMIN"
    ),
    personalDetails: Joi.any(),
    professionalDetails: Joi.any(),
    skillsDetails: Joi.any(),
    project: Joi.any(),
    slackMemId: Joi.string().allow(null, ""),
    empPhoneNumber: Joi.string().allow(null, ""),
    empCtc: Joi.number().min(0).allow(null, ""),
    yearsOfExperience: Joi.number().allow(null),
  }),
}).options({ abortEarly: false });

const reviewupdatedSchema = Joi.object({
  status: Joi.string().valid("accepted", "rejected", "pending"),
  message: Joi.string().allow(null, ""),
}).options({ abortEarly: false });

module.exports = { reviewSchema, reviewupdatedSchema };
