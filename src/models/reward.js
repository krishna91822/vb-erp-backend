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
      enum:["Daily", "Weekly", "Monthly", "Yearly", "General"],
      required: true
    },
    reward_subType: {
      type: String,
      enum:["work Anniversary", "Birthday Celebration", "onDemand"],
      required: function () {
        return this.reward_type === "Daily"
    }
    },
    reward_sender: {
      type: String,
      enum: ["CEO", "Manager", "Selected"],
      required: true,
    },
    reward_receiver: {
      type: [String],
      enum: ["Manager", "Employee", "Everyone", "Selected"],
      required: true,
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
      enum: ["Created", "In progress", "Stopped"],
      default: "Created",
    },
    employee_id: {
      type: Number,
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
