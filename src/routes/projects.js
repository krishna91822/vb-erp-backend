//importing packages
const express = require("express");
const ProjectRouter = express.Router();
const { hasPermission } = require("../middleware/auth");

//importing from controller
const {
  // getProjects,
  // getSortedProjects,
  getActiveProjects,
  getSortedActiveProjects,
  getDoneProjects,
  getSortedDoneProjects,
  getProjectById,
  createProjects,
  updateProject,
  getOtherProjects,
  getSortedOtherProjects,
} = require("../controllers/projectsController");

// POST request
ProjectRouter.post(
  "/",
  hasPermission(["approver", "leader", "super_admin", , "pms_admin"]),
  createProjects
);

//PUT method for update
ProjectRouter.put(
  "/:id",
  hasPermission(["approver", "leader", "super_admin", "pms_admin"]),
  updateProject
);

// //GET Method
// ProjectRouter.get("/", getProjects);
// ProjectRouter.get("/:fieldName", getSortedProjects);

// GET Method for Active Projects
ProjectRouter.get(
  "/active",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getActiveProjects
);
ProjectRouter.get(
  "/active/:fieldName",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getSortedActiveProjects
);

// GET Method for Active Projects
ProjectRouter.get(
  "/done",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getDoneProjects
);
ProjectRouter.get(
  "/done/:fieldName",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getSortedDoneProjects
);

//GET method for Other projects
ProjectRouter.get(
  "/others",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getOtherProjects
);
ProjectRouter.get(
  "/others/:fieldName",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getSortedOtherProjects
);

//GET Method by id
ProjectRouter.get(
  "/:id",
  hasPermission([
    "approver",
    "leader",
    "super_admin",
    "hr_admin",
    "finance_admin",
    "pms_admin",
  ]),
  getProjectById
);

module.exports = ProjectRouter;
