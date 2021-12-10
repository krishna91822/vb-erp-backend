const mongoose = require("mongoose");

// creating rewards schema
const rewardsSchema = mongoose.Schema(
  {
    reward_display_name: {
      type: String,
      required: true,
    },
    reward_type: {
      type: String,
      enum:["daily", "weekly", "monthly", "yearly", "on-demand"],
      required: true
    },
    reward_subType: {
      type: String,
      enum:["work-anniversary", "birthday-celebration","starOfTheMonth"],
      required: function () {
        return this.reward_type === "daily"
    }
    },
    reward_sender: {
      type: String,
      enum: ["ceo", "manager", "selected"],
      required: true,
    },
    selected_sender: {
      type: [mongoose.Schema.Types.Mixed],
      required: function () {
        return this.reward_sender === "selected"
    }
    },
    reward_receiver: {
      type: String,
      enum: ["manager", "employees", "everyone", "selected"],
      required: true,
    },
    selected_receiver: {
      type: [mongoose.Schema.Types.Mixed],
      required: function () {
        return this.reward_receiver === "selected"
    }
    },
    receiver_message: {
      type: String,
      required: true,
    },
    announcement_type: {
      type: String,
      enum:["public", "private"],
      required: true,
    },
    slack_channel: {
      type: String,
      required: false,
    },
    channel_message: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["created", "in progress", "stopped"],
      default: "created",
    },
    sender_id: {
      type: Number,
    },
    receipients_id:{
      type: [Number]
    }
  },
  {
    timestamps: true,
  }
);

// creating rewards collection with rewardsSchema
const rewardsModal = mongoose.model("rewards", rewardsSchema);

// exporting collections
module.exports = rewardsModal;
