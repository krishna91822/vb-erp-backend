const express = require("express");

const {
  getAllReviews,
  createReview,
  getReview,
  updateReviewStatus,
  deleteReview,
} = require("../controllers/ReviewController");
const router = express.Router();

router.get("/", getAllReviews);
router.post("/", createReview);
router.get("/:id", getReview);
router.patch("/:id", updateReviewStatus);
router.delete("/:id", deleteReview);

module.exports = router;
