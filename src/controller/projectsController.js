// importing required Files and Routes
const { json } = require("body-parser");
const ProjectsInfoModel = require("../models/projectsModel");

// Creating and Storing Created Projects data into database by POST request
const createProjects = async(req, res) => {
    let newProject = new ProjectsInfoModel({
        vbProjectId: req.body.vbProjectId,
        clientName: req.body.clientName,
        projectName: req.body.projectName,
        clientProjectManager: req.body.clientProjectManager,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        id: req.body.id,
        clientProjectSponsor: req.body.clientProjectSponsor,
        clientFinanceController: req.body.clientFinanceController,
        clientPrimaryContact: req.body.clientPrimaryContact,
        vbProjectManager: req.body.vbProjectManager,
        domainSector: req.body.domainSector,
        vbProjectStatus: req.body.vbProjectStatus,
        resources: req.body.resources,
    });

    try {
        const project = await newProject.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json();
    }
}

//getting all the projects
const getProjects = async(req, res) => {
    try {
        const Projects = await ProjectsInfoModel.find({});
        res.status(200).send(Projects);
    } catch (error) {
        res.status(400).send(error);
    }
};

//getting single project by its _id
const getProjectById = async(req, res) => {
    try {
        const _id = req.params.id
        const getProjectById = await ProjectsInfoModel.find({ vbProjectId: _id });
        res.status(200).send(getProjectById);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Updating project by its _id
const updateProject = async(req, res) => {
    try {
        const _id = req.params.id
        const updateProject = await ProjectsInfoModel.findOneAndUpdate({ vbProjectId: _id }, req.body, {
            new: true
        });
        res.status(200).send(updateProject);
    } catch (error) {
        res.status(400).send(error);
    }
};

//exporting to use in other files
module.exports = {
    getProjects,
    getProjectById,
    createProjects,
    updateProject
};