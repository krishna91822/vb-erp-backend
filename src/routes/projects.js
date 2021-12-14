//importing packages
const express = require("express");
const ProjectRouter = express.Router();

//importing from controller
const {
  getProjects,
  getSortedProjects,
  getActiveProjects,
  getSortedActiveProjects,
  getDoneProjects,
  getSortedDoneProjects,
  getProjectById,
  createProjects,
  updateProject,
} = require("../controller/projectsController");

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


//GET Method by id
ProjectRouter.get("/:id", getProjectById);

module.exports = ProjectRouter;
