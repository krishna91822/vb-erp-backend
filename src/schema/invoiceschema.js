const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)

const invoiceSchema = Joi.object()
  .keys({
    userid: Joi.objectId().required(),
    client_sponsor: Joi.string().required(),
    client_finance_controller: Joi.string().required(),
    invoice_raised: Joi.string().required(),
    invoice_amount_received: Joi.number().required(),
    vb_bank_account: Joi.string(),
    amount_received_on: Joi.date(),

  })
  .options({ abortEarly: false });

module.exports = { invoiceSchema };

