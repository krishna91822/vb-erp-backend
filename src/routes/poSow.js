const express = require("express");
const router = express.Router();

const {
  createPoSow,
  getPoDeatil,
  getSortedPoList,
  updatePODetais,
  getClients,
  getProjects,
  getDetails,
} = require("../controllers/poSowController");

router.post("/", createPoSow);
router.get("/:id", getPoDeatil);
router.get("/sort/:fieldName", getSortedPoList);
router.get("/capturePO/clients", getClients);
router.get("/capturePO/clients/:clientName", getProjects);
router.get("/capturePO/details", getDetails);
router.patch("/:id", updatePODetais);
// router.patch("/status/:id", updatePOStatus);

module.exports = router;
