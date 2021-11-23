//importing express
const express = require("express");
const ResourceRouter = express.Router();

//importing from controller
const {
    getResources,
    getResourceById,
    createResource,
    updateResources
} = require("../controller/resourcesController");

// POST request
ResourceRouter.post("/", createResource);

//GET Method
ResourceRouter.get("/", getResources);

//GET Method by id
ResourceRouter.get("/:id", getResourceById);

//PUT method for update
ResourceRouter.put("/:id", updateResources);

module.exports = ResourceRouter;