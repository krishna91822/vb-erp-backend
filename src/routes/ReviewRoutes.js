const express = require("express");

const {
  getAllReviews,
  createReview,
  getReview,
  updateReviewStatus,
  deleteReview,
} = require("../controllers/ReviewController");
const router = express.Router();

router.route("/").get(getAllReviews).post(createReview); //Create Review (FOR ADMIN);

router
  .route("/:id")
  .get(getReview) //Get Review details (FOR READ ONLY)
  .patch(
    // updateReview,
    updateReviewStatus
  ) //Update Review details
  .delete(deleteReview); //delete Review documents

// Router.post('/:ReqId', ChangeStatus);

module.exports = router;
