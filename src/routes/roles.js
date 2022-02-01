const express = require("express");
const router = express.Router();

const { isAuthorized } = require("../middleware/auth");
const { getRoles, getAllRoles } = require("../controllers/rolesController");

router.get("/", getRoles);
router.get("/getallroles", getAllRoles);

module.exports = router;
