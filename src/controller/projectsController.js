// importing required Files and Routes
const { json } = require("body-parser");
const ProjectsInfoModel = require("../models/projectsModel");
// const ResourceInfoModel = require("../models/resourcesModel");

// Creating and Storing Created Projects data into database by POST request
const createProjects = async(req, res) => {
    try {
        const project = await ProjectsInfoModel(req.body);
        project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json(error);
    }
};

//getting all the projects
const getProjects = async(req, res) => {
    let query = [{
        vbProjectManager: { $regex: "", $options: 'i' },
    }, ];
    if (req.query.vbProjectStatus) {
        query.push({
            vbProjectStatus: {
                $regex: req.query.vbProjectStatus,
                $options: 'i'
            }
        });
    }
    if (req.query.clientName) {
        query.push({
            clientName: {
                $regex: req.query.clientName,
                $options: 'i'
            }
        });
    }
    if (req.query.vbProjectId) {
        query.push({
            vbProjectId: {
                $regex: req.query.vbProjectId,
                $options: 'i'
            }
        });
    }
    if (req.query.projectName) {
        query.push({
            projectName: {
                $regex: req.query.projectName,
                $options: 'i'
            }
        });
    }
  try {
    console.log(query);
    const status = req.params.status
    if(status!="Closed"){
    const Projects = await ProjectsInfoModel.find({ $and: [{ $and: query }],$or:[{vbProjectStatus :"On Hold"},{vbProjectStatus :"Active"}] });
    res.status(200).send(Projects);
    }
    else{
      const Projects = await ProjectsInfoModel.find({ $and: [{ $and: query }],$or:[{vbProjectStatus :"Closed"}] });
    res.status(200).send(Projects);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

//getting single project by its _id
const getProjectById = async(req, res) => {
    try {
        const _id = req.params.id
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
    // getProjectBySlug,
    createProjects,
    updateProject
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