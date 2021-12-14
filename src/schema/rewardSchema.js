const Joi = require("joi");

const rewardSchema = Joi.object()
  .keys({
    reward_display_name: Joi.string().required(),
    reward_type: Joi.string().valid("daily", "weekly", "monthly", "yearly", "on-demand").required(),
    reward_subType: Joi.string().valid("work-anniversary", "birthday-celebration","starOfTheMonth"),
    reward_sender: Joi.string().valid("ceo", "manager", "selected").required(),
    reward_receiver: Joi.string().valid("manager", "employees", "everyone", "selected").required(),
    sender_id: Joi.object(),
    recipients_ids: Joi.array(),
    receiver_message: Joi.string().required(),
    announcement_type: Joi.string().valid("public", "private").required(),
    slack_channel: Joi.string().required(),
    channel_message: Joi.string().required(),
    status: Joi.string().valid("created", "in progress", "stopped"),
    sender_id: Joi.number().min(3),
    receipients_id: Joi.array()
  })
  .options({ abortEarly: false });

module.exports = { rewardSchema };
