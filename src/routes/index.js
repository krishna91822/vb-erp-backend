var express = require("express");
var router = express.Router();

const userRoutes = require("./users");
const rewardRoutes = require("./rewards");
const employeeRoutes = require("./employee");
const poSowRoutes = require("./poSow")
const cimsRoutes = require('./cims');
const otherRoutes = require('./others')
const assigneeRoutes = require("./assign")
const invoiceRoutes = require("./invoiceroutes")
const { auth, getAccount } = require("../controllers/userController");
const { isAuthorized } = require("../middleware/auth");

router.post("/login", auth);
router.get("/account", isAuthorized, getAccount);
router.use("/users", isAuthorized, userRoutes);
router.use("/rewards", rewardRoutes);
router.use('/cims', cimsRoutes)
router.use('/', otherRoutes)
router.use("/assign", assigneeRoutes)
router.use("/invoice",invoiceRoutes)
router.use("/poSow",isAuthorized, poSowRoutes);
router.use("/employees",employeeRoutes);
module.exports = router;
