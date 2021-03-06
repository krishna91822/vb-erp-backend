const mongoose = require("mongoose");
const { Employee } = require("./employeeModel");
const rewardsSchema = mongoose.Schema(
  {
    reward_display_name: {
      type: String,
      required: true,
    },
    reward_type: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly", "Yearly", "On-Demand"],
      required: true,
    },
    reward_subType: {
      type: String,
      enum: ["work-anniversary", "birthday-celebration", "starOfTheMonth"],
      required: function () {
        return (
          (this.reward_type === "Daily") | (this.reward_type === "Monthly")
        );
      },
    },
    reward_sender: {
      type: String,
      enum: ["CEO", "Manager", "selected"],
      required: true,
    },
    reward_receiver: {
      type: String,
      enum: ["Manager", "Employees", "Everyone", "selected"],
      required: true,
    },
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Employee,
      required: false,
    },
    recipients_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Employee,
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
      required: function () {
        return this.announcement_type === "public";
      },
    },
    channel_message: {
      type: String,
      required: function () {
        return this.announcement_type === "public";
      },
    },
    status: {
      type: String,
      enum: ["Created", "In Progress", "Stopped"],
      default: "Created",
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
