const express = require("express");
const { hasPermission } = require("../middleware/auth");

const {
  getAllReviews,
  createReview,
  getReview,
  updateReviewStatus,
  deleteReview,
} = require("../controllers/ReviewController");
const router = express.Router();

router.get(
  "/",
  hasPermission([
    "user",
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getAllReviews
);
router.post(
  "/",
  hasPermission([
    "user",
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  createReview
);
router.get(
  "/:id",
  hasPermission([
    "user",
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getReview
);
router.patch(
  "/:id",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  updateReviewStatus
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
  deleteReview
);

module.exports = router;
