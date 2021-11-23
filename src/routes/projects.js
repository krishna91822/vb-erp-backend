//importing 
const express = require("express");
const ProjectRouter = express.Router();

//importing from controller
const {
    getProjects,
    getProjectById,
    createProjects,
    updateProject
} = require("../controller/projectsController");

// POST request
ProjectRouter.post("/", createProjects);

//GET Method
ProjectRouter.get("/", getProjects);

//GET Method by id
ProjectRouter.get("/:id", getProjectById);

//PUT method for update
ProjectRouter.put("/:id", updateProject);

module.exports = ProjectRouter;