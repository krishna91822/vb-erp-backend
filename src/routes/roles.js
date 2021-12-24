const express = require("express");
const router = express.Router();

const { isAuthorized } = require("../middleware/auth");
const { getRoles } = require("../controllers/rolesController");

router.get("/", getRoles);

module.exports = router;
