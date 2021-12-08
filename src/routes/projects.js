//importing packages
const express = require("express");
const ProjectRouter = express.Router();

//importing from controller
const {
    getProjects,
    getActiveProjects,
    getDoneProjects,
    getProjectById,
    // getProjectBySlug,
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

//GET Method by slug
// ProjectRouter.get("/:slug", getProjectBySlug);

module.exports = ProjectRouter;