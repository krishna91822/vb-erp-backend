const express = require("express");
const Router = express.Router();

const {
  get_reviews,
  get_Id_review,
} = require("../controllers/ReviewController");

Router.get("/Reviews", get_reviews);

Router.get("/Reviews/:empId", get_Id_review);

module.exports = Router;
