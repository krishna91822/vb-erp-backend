const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");

// Get all Request documents
router.get("/", requestController.getAllRequests);

// Create Request
router.post("/", requestController.createRequest);

module.exports = router;
