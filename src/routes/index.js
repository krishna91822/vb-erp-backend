var express = require("express");
var router = express.Router();

const userRoutes = require("./users");
const rewardRoutes = require("./rewards");
const poSowRoutes = require("./poSow");
const assigneeRoutes = require("./assign");
const invoiceRoutes = require("./invoiceroutes");
const { auth, getAccount } = require("../controllers/userController");
const { isAuthorized } = require("../middleware/auth");
const ProjectRouter = require("./projects");
const EmployeeRouter = require("./employee");
const ProjectEmployeeRouter = require("./projectAndEmployee");
const cimsRoutes = require("./cims");

router.post("/login", auth);
router.get("/account", isAuthorized, getAccount);
router.use("/users", isAuthorized, userRoutes);
router.use("/rewards", rewardRoutes);
router.use("/poSow", poSowRoutes);
router.use("/assign", assigneeRoutes);
router.use("/invoice", invoiceRoutes);
router.use("/projects", ProjectRouter);
router.use("/employees", EmployeeRouter);
router.use("/allocations", ProjectEmployeeRouter);
router.use("/cims", cimsRoutes);

module.exports = router;
