const Joi = require("joi");

const rewardSchema = Joi.object()
  .keys({
    reward_display_name: Joi.string().required(),
    reward_type: Joi.string().valid("daily", "weekly", "monthly", "yearly", "on-demand").required(),
    reward_subType: Joi.string().valid("work-anniversary", "birthday-celebration","starOfTheMonth"),
    reward_sender: Joi.string().valid("ceo", "manager", "selected").required(),
    reward_receiver: Joi.string().valid("manager", "employees", "everyone", "selected").required(),
    selected_sender: Joi.object(),
    selected_receiver: Joi.array(),
    sender_id: Joi.string(),
    recipients_ids: Joi.array(),
    receiver_message: Joi.string().required(),
    announcement_type: Joi.string().valid("public", "private").required(),
    slack_channel: Joi.string(),
    channel_message: Joi.string(),
    status: Joi.string().valid("created", "in progress", "stopped")
  })
  .options({ abortEarly: false });

module.exports = { rewardSchema };
