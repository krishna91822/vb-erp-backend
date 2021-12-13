//importing packages
const express = require("express");
const ProjectRouter = express.Router();

//importing from controller
const {
  getProjects,
  getActiveProjects,
  getDoneProjects,
  getProjectById,
  createProjects,
  updateProject,
} = require("../controller/projectsController");

// POST request
ProjectRouter.post("/", createProjects);

//PUT method for update
ProjectRouter.put("/:id", updateProject);

//GET Method
ProjectRouter.get("/", getProjects);

// GET Method for Active Projects
ProjectRouter.get("/active", getActiveProjects);

// GET Method for Active Projects
ProjectRouter.get("/done", getDoneProjects);

//GET Method by id
ProjectRouter.get("/:id", getProjectById);

module.exports = ProjectRouter;
