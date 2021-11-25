const express = require("express");
const Router = express.Router();

const {
  GetReviews,
  GetIdReview,
  ChangeStatus,
} = require("../controllers/ReviewController");

Router.get("/", GetReviews);

Router.get("/:ReqId", GetIdReview);

Router.post("/:ReqId", ChangeStatus);

module.exports = Router;
