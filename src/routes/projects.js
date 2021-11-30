//importing packages
const express = require("express");
const ProjectRouter = express.Router();

//importing from controller
const {
    getProjects,
    getProjectById,
    getProjectBySlug,
    createProjects,
    updateProject
} = require("../controller/projectsController");

// POST request
ProjectRouter.post("/", createProjects);

//GET Method
ProjectRouter.get("/", getProjects);

//GET Method by id
ProjectRouter.get("/:id", getProjectById);

//GET Method by slug
ProjectRouter.get("/:slug", getProjectBySlug);

//PUT method for update
ProjectRouter.put("/:id", updateProject);

module.exports = ProjectRouter;