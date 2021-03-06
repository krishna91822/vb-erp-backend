const joi = require("joi");

const employeeSchema = joi
  .object()
  .keys({
    empName: joi.string().max(30).required(),
    empEmail: joi.string().email().required(),
    empDoj: joi.string().allow(null, "").required(),
    empDob: joi.string().allow(null, "").required(),
    empDesignation: joi.string().required(),
    empDepartment: joi.string().required(),
    empReportingManager: joi.string().required(),
    empPersonalEmail: joi.string().email(),
    empPhoto: joi.string(),
    empConnections: joi.number(),
    empHobbies: joi.array(),
    empAboutMe: joi.any(),
    empBand: joi.string(),
    empGraduation: joi.string(),
    empGraduationUniversity: joi.string(),
    empPostGraduation: joi.string(),
    empPostGraduationUniversity: joi.string(),
    empPrimaryCapability: joi.array(),
    empSkillSet: joi.array(),
    empCertifications: joi.array(),
    empCurrentAddress: joi.any(),
    empResidentialAddress: joi.any(),
    role: joi
      .string()
      .valid(
        "USER",
        "APPROVER",
        "LEADERSHIP",
        "HR_ADMIN",
        "FINANCE_ADMIN",
        "PMS_ADMIN",
        "SUPER_ADMIN",
        "ADMIN"
      ),
    personalDetails: joi.any(),
    professionalDetails: joi.any(),
    skillsDetails: joi.any(),
    project: joi.any(),
    slackMemId: joi.string(),
    empPhoneNumber: joi.string(),
    empCtc: joi.number().min(0),
    yearsOfExperience: joi.number().allow(null),
    status: joi.string().valid("active", "inactive", "deleted"),
    band: joi
      .string()
      .valid("B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"),
  })
  .options({ abortEarly: false });

const employeeUpdateSchema = joi
  .object()
  .keys({
    empName: joi.string().max(30).required(),
    empEmail: joi.string().email().required(),
    empDoj: joi.date().required(),
    empDob: joi.date().required(),
    empDesignation: joi.string().required(),
    empDepartment: joi.string().required(),
    empReportingManager: joi.string().required(),
    empPersonalEmail: joi.string().email(),
    empPhoto: joi.string(),
    empConnections: joi.number(),
    empHobbies: joi.array(),
    empAboutMe: joi.any(),
    empBand: joi.string(),
    empGraduation: joi.string(),
    empGraduationUniversity: joi.string(),
    empPostGraduation: joi.string(),
    empPostGraduationUniversity: joi.string(),
    empPrimaryCapability: joi.array(),
    empSkillSet: joi.array(),
    empCertifications: joi.array(),
    empCurrentAddress: joi.any(),
    empResidentialAddress: joi.any(),
    role: joi
      .string()
      .valid(
        "USER",
        "APPROVER",
        "LEADERSHIP",
        "HR_ADMIN",
        "FINANCE_ADMIN",
        "PMS_ADMIN",
        "SUPER_ADMIN",
        "ADMIN"
      ),
    personalDetails: joi.any(),
    professionalDetails: joi.any(),
    skillsDetails: joi.any(),
    project: joi.any(),
    slackMemId: joi.string(),
    empPhoneNumber: joi.string(),
    empCtc: joi.number().min(0),
    yearsOfExperience: joi.number().allow(null),
    status: joi.string().valid("active", "inactive", "deleted"),
    band: joi
      .string()
      .valid("B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"),
  })
  .options({ abortEarly: false });

module.exports = { employeeSchema, employeeUpdateSchema };
