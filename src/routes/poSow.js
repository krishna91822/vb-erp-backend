const express = require("express");
const router = express.Router();
const { hasPermission } = require("../middleware/auth");

const {
  createPoSow,
  getPoDeatil,
  getSortedPoList,
  updatePODetais,
  getClients,
  getProjects,
  getDetails,
} = require("../controllers/poSowController");

router.post("/", hasPermission("upload_PO/SOW/contract"), createPoSow);
router.get("/:id", hasPermission("view_CMS"), getPoDeatil);
router.get("/sort/:fieldName", hasPermission("view_CMS"), getSortedPoList);
router.get("/capturePO/clients", hasPermission("view_CMS"), getClients);
router.get(
  "/capturePO/clients/:clientName",
  hasPermission("view_CMS"),
  getProjects
);
router.get("/capturePO/details", hasPermission("view_CMS"), getDetails);
router.patch("/:id", hasPermission("upload_PO/SOW/contract"), updatePODetais);
// router.patch("/status/:id", updatePOStatus);

module.exports = router;
