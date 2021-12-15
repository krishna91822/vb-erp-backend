const mongoose = require("mongoose");
const employees= require("./employee");
const rewardsSchema = mongoose.Schema(
  {
    reward_display_name: {
      type: String,
      required: true,
    },
    reward_type: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly", "on-demand"],
      required: true,
    },
    reward_subType: {
      type: String,
      enum: ["work-anniversary", "birthday-celebration", "starOfTheMonth"],
      required: function () {
        return (this.reward_type === "daily"|this.reward_type === "monthly");
      },
    },
    reward_sender: {
      type: String,
      enum: ["ceo", "manager", "selected"],
      required: true,
    },
    selected_sender: {
      type: [mongoose.Schema.Types.Mixed],
      required: function () {
        return this.reward_sender === "selected";
      },
    },
    selected_receiver: {
      type: [mongoose.Schema.Types.Mixed],
      required: function () {
        return this.reward_receiver === "selected";
      },
    },
    reward_receiver: {
      type: String,
      enum: ["manager", "employees", "everyone", "selected"],
      required: true,
    },
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: employees,
      required: false,
    },
    recipients_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: employees,
        required: false,
      },
    ],
    receiver_message: {
      type: String,
      required: true,
    },
    announcement_type: {
      type: String,
      enum: ["public", "private"],
      required: true,
    },
    slack_channel: {
      type: String,
      required:  function () {
        return (this.announcement_type === "public");
      },
    },
    channel_message: {
      type: String,
      required: function () {
        return (this.announcement_type === "public");
      },
    },
    status: {
      type: String,
      enum: ["created", "in progress", "stopped"],
      default: "created",
    },
    
  },
  {
    timestamps: true,
  }
);

// creating rewards collection with rewardsSchema
const rewardsModal = mongoose.model("rewards", rewardsSchema);

// exporting collections
module.exports = rewardsModal;
