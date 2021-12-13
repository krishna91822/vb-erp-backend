const Joi = require("joi");

const poSowSchema = Joi.object()
  .keys({
    Client_Name: Joi.string().min(3).max(30).lowercase().required(),
    Project_Name: Joi.string().required(),
    Client_Sponser: Joi.array()
      .items(Joi.string().alphanum().lowercase().required())
      .required(),
    Client_Finance_Controller: Joi.array()
      .items(Joi.string().lowercase().required())
      .required(),
    Targetted_Resources: Joi.array().items(Joi.string().required()).required(),
    Status: Joi.string()
      .valid("Rejected", "Pending", "Accepted", "Closed", "Drafted")
      .required(),
    Type: Joi.string().alphanum().valid("PO", "SOW").required(),
    PO_Number: Joi.string().alphanum().required(),
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
