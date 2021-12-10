const express = require("express");
const ClientRouter = express.Router();

// importing from controller
const getFilteredClients = require("../controller/clientsController");

// GET
ClientRouter.get("/", getFilteredClients);

module.exports = ClientRouter;