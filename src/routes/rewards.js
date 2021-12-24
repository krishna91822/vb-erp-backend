const express = require("express");
const router = express.Router();

const { isAuthorized } = require("../middleware/auth");
const {
  getRewards,
  storeReward,
  getRewardDetail,
  editReward,
  deleteReward,
  launchRewards,
  searchRewards,
  launchRewardsinstantaly
} = require("../controllers/rewardController");

router.get("/", getRewards);
// router.post("/", createRewards);
router.post("/",storeReward);
router.get("/search",searchRewards);
router.get("/:id",getRewardDetail);
router.put("/:id",editReward);
router.delete("/:id",deleteReward);
router.put("/launch/:id",launchRewards);
router.get("/launchinstantly/:id",launchRewardsinstantaly);

//create getrewards logic

module.exports = router;
