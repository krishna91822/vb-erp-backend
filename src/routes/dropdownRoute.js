const express = require("express");
const router = express.Router();

const {
  getAllDropdowns,
  getDropdown,
  createDropdown,
  updateDropdown,
  deleteDropdown,
} = require("../controllers/dropdownController");

router.get("/", getAllDropdowns);
router.get("/:id", getDropdown);
router.post("/", createDropdown);
router.patch("/:id", updateDropdown);
router.delete("/:id", deleteDropdown);

module.exports = router;
