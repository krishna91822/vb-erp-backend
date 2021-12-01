var express = require("express");
var router = express.Router();

const userRoutes = require("./users");
const rewardRoutes = require("./rewards");
const poSowRoutes = require("./poSow")
const assigneeRoutes = require("./assign")
const { auth, getAccount } = require("../controllers/userController");
const { isAuthorized } = require("../middleware/auth");

router.post("/login", auth);
router.get("/account", isAuthorized, getAccount);
router.use("/users", isAuthorized, userRoutes);
router.use("/rewards", rewardRoutes);
router.use("/poSow", isAuthorized, poSowRoutes)
router.use("/assign", isAuthorized,assigneeRoutes)

module.exports = router;
