const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const projectEmployeeSchema = Joi.object()
  .keys({
    projectId: Joi.objectId(),
    empId: Joi.objectId(),
    allocationStartDate: Joi.string(),
    allocationEndDate: Joi.string(),
    allocationPercentage: Joi.number(),
    rackRate: Joi.number(),
  })
  .options({ abortEarly: false });

module.exports = { projectEmployeeSchema };
