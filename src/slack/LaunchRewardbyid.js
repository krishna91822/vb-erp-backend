const { getRewardById } = require("./operations");
const { ceoMessages } = require("./operations");
const { managerMessage } = require("./operations");
const { selectedMessages } = require("./operations");
const {workanniversary}  = require("./operations");
const {birthdayjob } = require("./operations");
const { starOfTheMonth } = require("./operations");


const checkrewardsubtype=async(reward,rewardId)=>{
  if(reward.reward_type==="Daily" && reward.reward_subType==="birthday-celebration"){
    await birthdayjob(rewardId)
  }
  else if(reward.reward_type==="Daily" && reward.reward_subType==="work-anniversary"){
    await workanniversary(rewardId)
  }
  else if(reward.reward_type==="Monthly" && reward.reward_subType==="starOfTheMonth"){
    await starOfTheMonth(rewardId)
  }
}

const launchReward = async (rewardId) => {
  try {
    const rewardsbyid = await getRewardById(rewardId);
    const rewards = [rewardsbyid];
    // console.log(rewards);
    if (rewards != null) {
      rewards.map(async (reward) => {
        if (reward.status != "In Progress") {
          console.log(
            `${reward.reward_display_name} are not in In Progress state`
          );
          return null
        }
        if (reward.status === "In Progress") {
          if (reward.reward_sender === "CEO") {
            if(reward.reward_type==="On-Demand"){
              await ceoMessages(reward);
            }
            else{
              await checkrewardsubtype(reward,rewardId)
            }
          }
          if (reward.reward_sender === "Manager") {
            if(reward.reward_type==="On-Demand"){
              await managerMessage(reward);
            }
            else{
              await checkrewardsubtype(reward,rewardId)
            }
          }
          if (reward.reward_sender === "selected") {
            if(reward.reward_type==="On-Demand"){
              await selectedMessages(reward);
            }
            else{
              await checkrewardsubtype(reward,rewardId)
            }
          }
        }
      });
    }
    return "done"
  } catch (error) {
    console.log(error.message);
  }
};

// launchReward("61c0603c08ca9f9a312e6085");

module.exports = launchReward;
