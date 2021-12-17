const Joi = require("joi");

const poSowSchema = Joi.object()
  .keys({
    Project_Id: Joi.string().required(),
    Client_Name: Joi.string().min(3).max(30).lowercase().required(),
    Project_Name: Joi.string().required(),
    Client_Sponser: Joi.string().required(),
    Client_Finance_Controller: Joi.string().required(),
    Targetted_Resources: Joi.object().required(),
    Targeted_Res_AllocationRate: Joi.object().required(),
    Status: Joi.string()
      .valid("Rejected", "Pending", "Accepted", "Closed", "Drafted")
      .required(),
    Type: Joi.string().alphanum().valid("PO", "SOW").required(),
    PO_Amount: Joi.number().required(),
    Currency: Joi.string().alphanum().required(),
    Document_Name: Joi.string().required(),
    Document_Type: Joi.string().required(),
    POSOW_endDate: Joi.date().iso().required(),
    Remarks: Joi.string().empty(""),
  })
  .options({ abortEarly: false });

const querySchema = Joi.object().keys({
  page: Joi.number().integer().positive(),
  limit: Joi.number().integer().positive(),
  keyword: Joi.string().empty(""),
});

module.exports = { poSowSchema, querySchema };
