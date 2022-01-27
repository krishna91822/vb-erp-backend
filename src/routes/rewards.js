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

router.get(
  "/",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getRewards
);
// router.post("/", createRewards);
router.post(
  "/",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  storeReward
);
router.get(
  "/search",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  searchRewards
);
router.get(
  "/:id",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getRewardDetail
);
router.put(
  "/:id",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  editReward
);
router.delete(
  "/:id",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  deleteReward
);
router.put(
  "/launch/:id",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  launchRewards
);
router.get(
  "/launchinstantly/:id",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  launchRewardsinstantaly
);

//create getrewards logic

module.exports = router;
