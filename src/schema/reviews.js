const Joi = require("joi");
//Joi.objectId = require("joi-objectid")(Joi);

const reviewSchema = Joi.object({
  reqId: Joi.number().required(),
  reqName: Joi.string().required(),
  reqType: Joi.string().valid("profile-creation", "profile-update").required(),
  status: Joi.string().valid("accepted", "rejected", "pending"),
  employeeDetails: Joi.object({
    empName: Joi.string().max(30).required(),
    empEmail: Joi.string().email().required(),
    empPersonalEmail: Joi.string().email().required(),
    empPhoneNumber: Joi.string().required(),
    empDoj: Joi.date().required(),
    empDob: Joi.date().required(),
    empPhoto: Joi.string(),
    empDesignation: Joi.string(),
    empDepartment: Joi.string().required(),
    empReportingManager: Joi.string(),
    empConnections: Joi.number(),
    empHobbies: Joi.array(),
    empAboutMe: Joi.string(),
    empCurrentAddress: Joi.string().lowercase(),
    empResidentialAddress: Joi.string().lowercase(),
    empBand: Joi.string(),
    empCtc: Joi.number().min(0).required(),
    empGraduation: Joi.string(),
    empGraduationUniversity: Joi.string(),
    empPostGraduationUniversity: Joi.string(),
    empPostGraduation: Joi.string(),
    empPrimaryCapability: Joi.array(),
    empSkillSet: Joi.array(),
    empCertifications: Joi.array(),
    role: Joi.string()
      .valid(
        "USER",
        "APPROVER",
        "LEADERSHIP",
        "HR_ADMIN",
        "FINANCE_ADMIN",
        "PMS_ADMIN",
        "SUPER_ADMIN"
      )
      .required(),
    personalDetails: Joi.any(),
    professionalDetails: Joi.any(),
    skillsDetails: Joi.any(),
    slackMemId: Joi.string(),
  }),
}).options({ abortEarly: false });

const reviewupdatedSchema = Joi.object({
  reqId: Joi.number(),
  reqName: Joi.string(),
  reqType: Joi.string().valid("profile-creation", "profile-update"),
  status: Joi.string().valid("accepted", "rejected", "pending").required(),
  employeeDetails: Joi.object({
    empName: Joi.string().max(30).required(),
    empEmail: Joi.string().email().required(),
    empPersonalEmail: Joi.string().email().required(),
    empPhoneNumber: Joi.string().required(),
    empDoj: Joi.date().required(),
    empDob: Joi.date().required(),
    empPhoto: Joi.string(),
    empDesignation: Joi.string(),
    empDepartment: Joi.string().required(),
    empReportingManager: Joi.string().required(),
    empConnections: Joi.number(),
    empHobbies: Joi.array(),
    empAboutMe: Joi.string().required(),
    empCurrentAddress: Joi.string().lowercase(),
    empResidentialAddress: Joi.string().lowercase(),
    empBand: Joi.string(),
    empCtc: Joi.number().min(0).required(),
    empGraduation: Joi.string().required(),
    empPostGraduationUniversity: Joi.string(),
    empPostGraduation: Joi.string(),
    empPrimaryCapability: Joi.array(),
    empSkillSet: Joi.array(),
    empCertifications: Joi.array(),
    role: Joi.string()
      .valid(
        "USER",
        "APPROVER",
        "LEADERSHIP",
        "HR_ADMIN",
        "FINANCE_ADMIN",
        "PMS_ADMIN",
        "SUPER_ADMIN"
      )
      .required(),
    personalDetails: Joi.any(),
    professionalDetails: Joi.any(),
    skillsDetails: Joi.any(),
    slackMemId: Joi.any(),
  }),
}).options({ abortEarly: false });

module.exports = { reviewSchema, reviewupdatedSchema };
