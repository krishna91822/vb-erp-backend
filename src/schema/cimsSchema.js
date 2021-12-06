const Joi = require("joi")
//validation

const cimsSchema = Joi.object()
  .keys({
    designation: Joi.string().required(),
    brandname: Joi.string().required(),
    domain: Joi.string().required(),
    baselocation: Joi.string().required(),
    addressLine1: Joi.string().required(),
    country: Joi.string().min(4).required(),
    state: Joi.string().required(),
    district: Joi.string().required(),
    city: Joi.string().required(),

  })

  .options({ abortEarly: false, allowUnknown: true });

  
  const locationSchema = Joi.object()
  .keys({
    pincode: Joi.string(),
    country: Joi.string()
  }).options({ allowUnknown: true });
  
  const updateSchema = Joi.object()
  .keys({
    designation: Joi.string().required(),
    brandname: Joi.string().required(),
    domain: Joi.string().required(),
    baselocation: Joi.string().required(),
    addressLine1: Joi.string().required(),
    country: Joi.string().min(4).required(),
    state: Joi.string().required(),
    district: Joi.string().required(),
    city: Joi.string().required()
  }).options({  abortEarly: false, allowUnknown: true });


module.exports = { cimsSchema, locationSchema,updateSchema };
