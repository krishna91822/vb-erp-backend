var express = require("express");
var router = express.Router();

const userRoutes = require("./users");
const rewardRoutes = require("./rewards");
const poSowRoutes = require("./poSow");
const cimsRoutes = require("./cims");
const tempUserRoutes = require("./tempUser");
const rolesRoutes = require("./roles");
const otherRoutes = require("./others");
const assigneeRoutes = require("./assign");
const invoiceRoutes = require("./invoiceroutes");
const {
  auth,
  getAccount,
  validateToken,
  logout,
} = require("../controllers/userController");
const { isAuthorized } = require("../middleware/auth");
const reviewRoutes = require("./ReviewRoutes");
const employeeRoutes = require("./employeeRoute");
const ProjectRouter = require("./projects");
const ProjectEmployeeRouter = require("./projectAndEmployee");
const universityRoutes = require("./universityRoute");
router.post("/login", auth);
router.get("/account", isAuthorized, getAccount);
router.use("/users", isAuthorized, userRoutes);
router.use("/rewards", isAuthorized, rewardRoutes); //
router.use("/", otherRoutes);
router.use("/assign", isAuthorized, assigneeRoutes); //doubt
router.use("/invoice", isAuthorized, invoiceRoutes); //
router.use("/poSow", isAuthorized, poSowRoutes); //
router.use("/employees", isAuthorized, employeeRoutes); //doubt
router.use("/reviews", isAuthorized, reviewRoutes); //doubt
router.use("/projects", isAuthorized, ProjectRouter); //
router.use("/allocations", isAuthorized, ProjectEmployeeRouter); //
router.use("/cims", isAuthorized, cimsRoutes); //
router.use("/tempUsers", isAuthorized, tempUserRoutes);
router.use("/roles", isAuthorized, rolesRoutes);
router.use("/universities", isAuthorized, universityRoutes);
router.get("/validateToken", isAuthorized, validateToken);
router.get("/logout", isAuthorized, logout);
module.exports = router;
