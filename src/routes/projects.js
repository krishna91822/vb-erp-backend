//importing packages
const express = require("express");
const ProjectRouter = express.Router();

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
ProjectRouter.post("/", createProjects);

//PUT method for update
ProjectRouter.put("/:id", updateProject);

// //GET Method
// ProjectRouter.get("/", getProjects);
// ProjectRouter.get("/:fieldName", getSortedProjects);

// GET Method for Active Projects
ProjectRouter.get("/active", getActiveProjects);
ProjectRouter.get("/active/:fieldName", getSortedActiveProjects);

// GET Method for Active Projects
ProjectRouter.get("/done", getDoneProjects);
ProjectRouter.get("/done/:fieldName", getSortedDoneProjects);

//GET method for Other projects
ProjectRouter.get("/others", getOtherProjects);
ProjectRouter.get("/others/:fieldName", getSortedOtherProjects);

//GET Method by id
ProjectRouter.get("/:id", getProjectById);

module.exports = ProjectRouter;
