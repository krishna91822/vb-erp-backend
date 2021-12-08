const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)

const projectEmployeeSchema = Joi.object()
  .keys({
    projectId: Joi.objectId().required(),  
    empId: Joi.objectId().required(),
    allocationStartDate: Joi.string().required(),
    allocationEndDate: Joi.string().required(),
    allocationPercentage: Joi.number().required(),
    rackRate: Joi.number().required(),
  })
  .options({ abortEarly: false });

module.exports = { projectEmployeeSchema };
