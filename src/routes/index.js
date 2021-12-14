var express = require("express");
var router = express.Router();

const userRoutes = require("./users");
const rewardRoutes = require("./rewards");
const poSowRoutes = require("./poSow")
const cimsRoutes = require('./cims');
const otherRoutes = require('./others')
const { auth, getAccount } = require("../controllers/userController");
const { isAuthorized } = require("../middleware/auth");
const { postLogin } = require("../controllers/othersController");

router.post("/login", postLogin);
router.get("/account", isAuthorized, getAccount);
router.use("/users", isAuthorized, userRoutes);
router.use("/rewards", rewardRoutes);
router.use("/poSow", poSowRoutes);
router.use('/cims', cimsRoutes)
router.use('/', otherRoutes)

module.exports = router;
