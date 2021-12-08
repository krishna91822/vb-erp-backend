const Joi = require("joi");

const assigneeSchema = Joi.object()
    .keys({
        PO_Id: Joi.string().min(3).max(30).required(),
        Employee_Id: Joi.string().min(3).max(30).required(),
        Employee_Name: Joi.string().min(3).max(30).required(),
        Allocation_Rate: Joi.number().required(),
        Start_Date: Joi.date(),
        End_Date: Joi.date()

    })
    .options({ abortEarly: false });

const querySchema = Joi.object()
    .keys({
        page: Joi.number().integer().positive(),
        limit: Joi.number().integer().positive()
    })

module.exports = { assigneeSchema, querySchema };
