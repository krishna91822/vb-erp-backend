const express = require("express");
const router = express.Router();

const { isAuthorized } = require("../middleware/auth");
const { getUsers } = require("../controllers/tempUserController");

router.get("/", getUsers);

module.exports = router;
