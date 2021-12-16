const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const invoiceSchema = Joi.object()
  .keys({
    PO_Id: Joi.objectId().required(),
    client_sponsor: Joi.string().required(),
    client_finance_controller: Joi.string().required(),
    invoice_raised: Joi.string().valid("Yes", "No").required(),
    invoice_received: Joi.string().valid("Yes", "No").required(),
    invoice_amount_received: Joi.number(),
    vb_bank_account: Joi.string(),
    amount_received_on: Joi.date().iso(),
  })
  .options({ abortEarly: false });

const querySchema = Joi.object().keys({
  page: Joi.number().integer().positive(),
  limit: Joi.number().integer().positive(),
  keyword: Joi.string().empty(""),
});

module.exports = { invoiceSchema, querySchema };
