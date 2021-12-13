const joi = require("joi");

const employeeSchema = joi
  .object()
  .keys({
    empName: joi.string().max(30).required(),
    empEmail: joi.string().email().required(),
    empPersonalEmail: joi.string().email().required(),
    empPhoneNumber: joi.string().required(),
    empDoj: joi.date().required(),
    empDob: joi.date().required(),
    empPhoto: joi.string(),
    empDesignation: joi.string(),
    empDepartment: joi.string().required(),
    empReportingManager: joi.string().required(),
    empConnections: joi.number(),
    empHobbies: joi.array(),
    empAboutMe: joi.string().required(),
    empCurrentAddress: joi.string().lowercase(),
    empResidentialAddress: joi.string().lowercase(),
    empBand: joi.string(),
    empCtc: joi.number().min(0).required(),
    empGraduation: joi.string().required(),
    empGraduationUniversity: joi.string(),
    empPostGraduation: joi.string(),
    empPrimaryCapability: joi.array(),
    empSkillSet: joi.array(),
    empCertifications: joi.array(),
    role: joi
      .string()
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
  })
  .options({ abortEarly: false });

const employeeUpdateSchema = joi
  .object()
  .keys({
    empName: joi.string().max(30),
    empEmail: joi.string().email(),
    empPersonalEmail: joi.string().email(),
    empPhoneNumber: joi.string(),
    empDoj: joi.date(),
    empDob: joi.date(),
    empPhoto: joi.string(),
    empDesignation: joi.string(),
    empDepartment: joi.string(),
    empReportingManager: joi.string(),
    empConnections: joi.number(),
    empHobbies: joi.array(),
    empAboutMe: joi.string(),
    empCurrentAddress: joi.string().lowercase(),
    empResidentialAddress: joi.string().lowercase(),
    empBand: joi.string(),
    empCtc: joi.number().min(0),
    empGraduation: joi.string(),
    empGraduationUniversity: joi.string(),
    empPostGraduation: joi.string(),
    empPrimaryCapability: joi.array(),
    empSkillSet: joi.array(),
    empCertifications: joi.array(),
    role: joi
      .string()
      .valid(
        "USER",
        "APPROVER",
        "LEADERSHIP",
        "HR_ADMIN",
        "FINANCE_ADMIN",
        "PMS_ADMIN",
        "SUPER_ADMIN"
      ),
  })
  .options({ abortEarly: false });

module.exports = { employeeSchema, employeeUpdateSchema };
