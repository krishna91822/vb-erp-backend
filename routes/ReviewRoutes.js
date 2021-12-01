const express = require('express');

const reviewController = require('../controllers/ReviewController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, reviewController.getAllReviews)
  .post(authController.protect, reviewController.createReview); //Create Review (FOR ADMIN);

router
  .route('/:id')
  .get(authController.protect, reviewController.getReview) //Get Review details (FOR READ ONLY)
  .patch(
    authController.protect,
    // reviewController.updateReview,
    reviewController.updateReviewStatus
  ) //Update Review details
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    reviewController.deleteReview
  ); //delete Review documents

// Router.post('/:ReqId', ChangeStatus);

module.exports = router;
