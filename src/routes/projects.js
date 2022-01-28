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
ProjectRouter.post("/", hasPermission("create_project_in_PMO"), createProjects);

//PUT method for update
ProjectRouter.put(
  "/:id",
  hasPermission("update_project_in_PMO"),
  updateProject
);

// //GET Method
// ProjectRouter.get("/", getProjects);
// ProjectRouter.get("/:fieldName", getSortedProjects);

// GET Method for Active Projects
ProjectRouter.get(
  "/active",
  hasPermission("view_PMO_module"),
  getActiveProjects
);
ProjectRouter.get(
  "/active/:fieldName",
  hasPermission("view_PMO_module"),
  getSortedActiveProjects
);

// GET Method for Active Projects
ProjectRouter.get("/done", hasPermission("view_PMO_module"), getDoneProjects);
ProjectRouter.get(
  "/done/:fieldName",
  hasPermission("view_PMO_module"),
  getSortedDoneProjects
);

//GET method for Other projects
ProjectRouter.get(
  "/others",
  hasPermission("view_PMO_module"),
  getOtherProjects
);
ProjectRouter.get(
  "/others/:fieldName",
  hasPermission("view_PMO_module"),
  getSortedOtherProjects
);

//GET Method by id
ProjectRouter.get("/:id", hasPermission("view_PMO_module"), getProjectById);

module.exports = ProjectRouter;
