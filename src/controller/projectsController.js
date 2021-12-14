// importing required Files and Routes
const { json } = require("body-parser");
const moment = require("moment");
const ProjectsInfoModel = require("../models/projectsModel");
const { getQueryString } = require("../utility/pmoUtils");
//JOI
const { projectsSchema } = require("../schema/projectsSchema");
const { customResponse, customPagination } = require("../utility/helper");

// Creating and Storing Created Projects data into database by POST request
const createProjects = async(req, res) => {
    try {
        const { error } = projectsSchema.validate(req.body);
        if (error) {
            code = 422;
            message = "Invalid request data";
            const resData = customResponse({
                code,
                message,
                err: error && error.details,
            });
            return res.status(code).send(resData);
        }

        const allProjects = await ProjectsInfoModel.find({});
        const project = await ProjectsInfoModel({
            ...req.body,
            vbProjectId: `VB-PROJ-${allProjects.length + 1}`,
        });
        project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(400).send(error);
    }
};

const updateProject = async(req, res) => {
    try {
        const _id = req.params.id;
        const updateProject = await ProjectsInfoModel.findById({ vbProjectId: _id },
            req.body, {
                new: true,
            }
        ).populate("clientId");
        res.status(200).send(updateProject);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getProjects = async(req, res) => {
    const query = getQueryString(req.query);
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;
    let code, message;
    try {
        code = 200;
        const Projects = await ProjectsInfoModel.find({ $and: [{ $and: query }] });
        const data = customPagination({ data: Projects, page, limit });
        const resData = customResponse({ code, data });
        res.status(200).send(resData);
    } catch (error) {
        code = 500;
        message = "Internal server error";
        const resData = customResponse({
            code,
            message,
            err: error,
        });
        return res.status(code).send(resData);
    }
};

const getActiveProjects = async(req, res) => {
    const query = getQueryString(req.query);
    try {
        const Projects = await ProjectsInfoModel.find({});
        await Projects.forEach(async(element) => {
            let date = moment().format("YYYY-MM-DD");
            let endDate = moment(element.endDate, "YYYY-MM-DD");

            if (element.vbProjectStatus == "On Hold" || "Un Assigned") {} else if (date.isAfter(endDate)) {
                let updateElement = await ProjectsInfoModel.findOneAndUpdate({ _id: element._id }, { $set: { vbProjectStatus: "Done" } });
                updateElement.save();
            }
        });
        const updatedProjects = await ProjectsInfoModel.find({
            $and: [{
                $and: query,
                $or: [
                    { vbProjectStatus: "On Hold" },
                    { vbProjectStatus: "Active" },
                    { vbProjectStatus: "Un Assigned" },
                ],
            }, ],
        });
        res.status(200).send(updatedProjects);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getDoneProjects = async(req, res) => {
    const query = getQueryString(req.query);
    try {
        const Projects = await ProjectsInfoModel.find({});
        await Projects.forEach(async(element) => {
            let date = moment().format("YYYY-MM-DD");
            let endDate = moment(element.endDate, "YYYY-MM-DD");

            if (element.vbProjectStatus == "On Hold" || "Un Assigned") {} else if (date.isAfter(endDate)) {
                let updateElement = await ProjectsInfoModel.findOneAndUpdate({ _id: element._id }, { $set: { vbProjectStatus: "Done" } });
                updateElement.save();
            }
        });
        const updatedProjects = await ProjectsInfoModel.find({
            $and: [{ $and: query }, { vbProjectStatus: "Done" }],
        });
        res.status(200).send(updatedProjects);
    } catch (error) {
        res.status(400).send(error);
    }
};

//getting single project by its _id
const getProjectById = async(req, res) => {
    try {
        const _id = req.params.id;
        const getProject = await ProjectsInfoModel.find({ vbProjectId: _id });
        res.status(200).send(getProject);
    } catch (error) {
        res.status(400).send(error);
    }
};

//exporting to use in other files
module.exports = {
    createProjects,
    updateProject,
    getProjects,
    getActiveProjects,
    getDoneProjects,
    getProjectById,
};