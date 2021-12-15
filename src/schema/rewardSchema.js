const Joi = require("joi");

const rewardSchema = Joi.object()
  .keys({
    reward_display_name: Joi.string().required(),
    reward_type: Joi.string().valid("Daily", "Weekly", "Monthly", "Yearly", "On-Demand").required(),
    reward_subType: Joi.string().valid("work-anniversary", "birthday-celebration","starOfTheMonth"),
    reward_sender: Joi.string().valid("CEO", "Manager", "selected").required(),
    reward_receiver: Joi.string().valid("Manager", "Employees", "Everyone", "selected").required(),
    selected_sender: Joi.object(),
    selected_receiver: Joi.array(),
    sender_id: Joi.string(),
    recipients_ids: Joi.array(),
    receiver_message: Joi.string().required(),
    announcement_type: Joi.string().valid("public", "private").required(),
    slack_channel: Joi.string(),
    channel_message: Joi.string(),
    status: Joi.string().valid("Created", "In Progress", "Stopped")
  })
  .options({ abortEarly: false });

module.exports = { rewardSchema };
