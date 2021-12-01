const express = require("express");
const router = express.Router();

const {
  createPoSow,
  updatePODetais,
} = require("../controllers/poSowController");

router.post("/", createPoSow);
router.patch("/:id", updatePODetais);

module.exports = router;
