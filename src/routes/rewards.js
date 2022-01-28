const express = require("express");
const router = express.Router();

const { isAuthorized, hasPermission } = require("../middleware/auth");

const {
  getRewards,
  storeReward,
  getRewardDetail,
  editReward,
  deleteReward,
  launchRewards,
  searchRewards,
  launchRewardsinstantaly,
} = require("../controllers/rewardController");

router.get("/", hasPermission("view_reward"), getRewards);
// router.post("/", createRewards);
router.post("/", hasPermission("create_reward"), storeReward);
router.get("/search", hasPermission("view_reward"), searchRewards);
router.get("/:id", hasPermission("view_reward"), getRewardDetail);
router.put("/:id", hasPermission("update_reward"), editReward);
router.delete("/:id", hasPermission("create_reward"), deleteReward);
router.put("/launch/:id", hasPermission("update_reward"), launchRewards);
router.get(
  "/launchinstantly/:id",
  hasPermission("view_reward"),
  launchRewardsinstantaly
);

//create getrewards logic

module.exports = router;
