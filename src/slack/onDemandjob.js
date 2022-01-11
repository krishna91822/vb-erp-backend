const { getRewards } = require("./operations");
const { ceoMessages } = require("./operations");
const { managerMessage } = require("./operations");
const { selectedMessages } = require("./operations");

require("dotenv").config();

const ceoslackid = "U02Q226E1PY";
// const ceoslackid = process.env.CEO_SLACK_ID;

const onDemandRewards = async () => {
  const rewards = await getRewards("On-Demand");
  if (rewards != null) {
    rewards.map(async (reward) => {
      if (reward.status != "In Progress") {
        console.log(
          `${reward.reward_display_name} are not in In Progress state`
        );
      }
      if (reward.status === "In Progress") {
        if (reward.reward_sender === "CEO") {
          await ceoMessages(reward);
        }
        if (reward.reward_sender === "Manager") {
          await managerMessage(reward);
        }
        if (reward.reward_sender === "selected") {
          await selectedMessages(reward);
        }
      }
    });
  }
};
// onDemandRewards();

module.exports = onDemandRewards;
