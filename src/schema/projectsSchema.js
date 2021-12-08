const Joi = require("joi");

const projectsSchema = Joi.object()
  .keys({  
    clientName: Joi.string().required(),
    projectName: Joi.string().required(),
    clientProjectManager: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    clientProjectSponser: Joi.string().required(),
    clientFinanceController: Joi.string().required(),
    clientPrimaryContact: Joi.number(),
    vbProjectManager: Joi.string().required(),
    domainSector: Joi.string(),
    vbProjectStatus: Joi.string().valid("Un Assigned", "On Hold", "Done", "Active"),

  })
  .options({ abortEarly: false });

module.exports = { projectsSchema };
