const express = require("express");
const router = express.Router();

const {
  createPoSow,
  getPoDeatil,
  getSortedPoList,
  updatePODetais,
  updatePOStatus,
} = require("../controllers/poSowController");

router.post("/", createPoSow);
router.get("/:id", getPoDeatil);
router.get("/sort/:fieldName", getSortedPoList);

router.patch("/:id", updatePODetais);
router.patch("/status/:id", updatePOStatus);

module.exports = router;
