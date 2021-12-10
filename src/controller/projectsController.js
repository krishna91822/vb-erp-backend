// importing required Files and Routes
const { json } = require("body-parser");
const ProjectsInfoModel = require("../models/projectsModel");
const { getQueryString } = require("../utility/pmoUtils");
//JOI
const { projectsSchema } = require("../schema/projectsSchema");
const { customResponse } = require("../utility/helper");


//current_date
let currentDate = new Date();
let current_date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;

// Creating and Storing Created Projects data into database by POST request
const createProjects = async (req, res) => {
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
    console.log("hi");
    res.status(400).send(error);
  }
};

// Updating project by its _id
const updateProject = async (req, res) => {
  try {
    const _id = req.params.id;
    const updateProject = await ProjectsInfoModel.findOneAndUpdate(
      { vbProjectId: _id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).send(updateProject);
  } catch (error) {
    res.status(400).send(error);
  }
};

//getting all the projects
const getProjects = async (req, res) => {
  const query = getQueryString(req.query);
  try {
    const Projects = await ProjectsInfoModel.find({ $and: [{ $and: query }] });
    res.status(200).send(Projects);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getActiveProjects = async (req, res) => {
  const query = getQueryString(req.query);

  try {
    const Projects = await ProjectsInfoModel.find({});
    Projects.forEach((element)=>{
      if (element.startDate <= current_date && element.endDate >= current_date) {
        Projects.updateOne({ "$set": { "vbProjectStatus": "Active" } });
        res.status(200).send(Projects);
    }
    });
  }
   catch (error) {
    res.status(400).send(error);
  }
};

const getDoneProjects = async (req, res) => {
  const query = getQueryString(req.query);

  try {
    const Projects = await ProjectsInfoModel.find({
      $and: [{ $and: query }, { vbProjectStatus: "Done" }],
    });
    res.status(200).send(Projects);
  } catch (error) {
    res.status(400).send(error);
  }
};

//getting single project by its _id
const getProjectById = async (req, res) => {
  try {
    const _id = req.params.id;
    const getProject = await ProjectsInfoModel.find({ vbProjectId: _id });
    res.status(200).send(getProject);
  } catch (error) {
    res.status(400).send(error);
  }
};

// getting single project by using slug feature
// const getProjectBySlug = async(req, res) => {
//     try {
//         const slugURL = req.params.slug
//         const project = await ProjectsInfoModel.findOne({ slug: slugURL });
//         res.status(200).send(project);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };

//exporting to use in other files
module.exports = {
  createProjects,
  updateProject,
  getProjects,
  getActiveProjects,
  getDoneProjects,
  getProjectById,
  // getProjectBySlug,
};

// const allProjects = req.body.resources.map(async(eachResource) => {
//     let newResource = new ResourceInfoModel({
//         associateName: eachResource.associateName,
//         allocation: eachResource.allocation,
//         rackRate: eachResource.rackRate,
//     });
//     await newResource.save();
// });

// filter by status, clientName, projectId and projectName

// if (req.query.startdate && req.query.enddate) {
//     query.push({
//         createdAt: {
//             $gte: new Date(req.query.startdate),
//             $lt: new Date(req.query.enddate),
//         },
//     });
// }
