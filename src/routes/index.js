var express = require("express");
var router = express.Router();

const userRoutes = require("./users");
const rewardRoutes = require("./rewards");
const poSowRoutes = require("./poSow");
const cimsRoutes = require("./cims");
const otherRoutes = require("./others");
const assigneeRoutes = require("./assign");
const invoiceRoutes = require("./invoiceroutes");
const { auth, getAccount } = require("../controllers/userController");
const { isAuthorized } = require("../middleware/auth");
const reviewRoutes = require("./ReviewRoutes");
const employeeRoutes = require("./employeeRoute");
const ProjectRouter = require("./projects");
const ProjectEmployeeRouter = require("./projectAndEmployee");

router.post("/login", auth);
router.get("/account", isAuthorized, getAccount);
router.use("/users", isAuthorized, userRoutes);
router.use("/rewards", rewardRoutes);
router.use("/", otherRoutes);
router.use("/assign", assigneeRoutes);
router.use("/invoice", invoiceRoutes);
router.use("/poSow", isAuthorized, poSowRoutes);
router.use("/employees", employeeRoutes);
router.use("/reviews", reviewRoutes);
router.use("/projects", ProjectRouter);
router.use("/allocations", ProjectEmployeeRouter);
router.use("/cims", cimsRoutes);

module.exports = router;
