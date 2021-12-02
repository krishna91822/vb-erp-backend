const Joi = require("joi");

const rewardSchema = Joi.object()
  .keys({
    reward_display_name: Joi.string().required(),
    reward_type: Joi.string().required(),
    reward_subType: Joi.string(),
    reward_sender: Joi.string().required(),
    reward_receiver: Joi.array().required(),
    receiver_message: Joi.string().required(),
    announcement_type: Joi.string().required(),
    slack_channel: Joi.string().required(),
    channel_message: Joi.string().required(),
    status: Joi.string(),
    employee_id: Joi.number().min(3),
  })
  .options({ abortEarly: false });

module.exports = { rewardSchema };
