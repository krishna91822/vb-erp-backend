const express = require("express");
const router = express.Router();

const {
  createPoSow,
  updatePODetais,
  updatePOStatus,
} = require("../controllers/poSowController");

router.post("/", createPoSow);
router.patch("/:id", updatePODetais);
router.patch("/status/:id", updatePOStatus);

module.exports = router;
