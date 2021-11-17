const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");

// Get all Request documents
router.get("/", requestController.get_all_requests);

// Create Request
router.post("/", requestController.create_request);

module.exports = router;
