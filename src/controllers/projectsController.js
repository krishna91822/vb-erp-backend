// importing required Files and Routes
const { json } = require("body-parser");
const moment = require("moment");
const ProjectsInfoModel = require("../models/projectsModel");
const { getQueryString } = require("../utility/pmoUtils");
//JOI
const { projectsSchema } = require("../schema/projectsSchema");
const { customResponse, customPagination } = require("../utility/helper");

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
    // console.log("hi");
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

// //getting all the projects
// const getProjects = async (req, res) => {
//   const query = getQueryString(req.query);
//   const page = req.query.page ? req.query.page : 1;
//   const limit = req.query.limit ? req.query.limit : 10;
//   let code, message;
//   try {
//     code = 200;
//     message = "Data Fetched Successfully!!";
//     const Projects = await ProjectsInfoModel.find({ $and: [{ $and: query }] });
//     const data = customPagination({ data: Projects, page, limit });
//     const resData = customResponse({ code, message, data });
//     res.status(200).send(resData);
//   } catch (error) {
//     code = 500;
//     message = "Internal server error";
//     const resData = customResponse({
//       code,
//       message,
//       err: error,
//     });
//     return res.status(code).send(resData);
//   }
// };

// //getting sorted all the projects
// const getSortedProjects = async (req, res) => {
//   const fieldName = req.params.fieldName;
//   const query = getQueryString(req.query);
//   const page = req.query.page ? req.query.page : 1;
//   const limit = req.query.limit ? req.query.limit : 10;
//   let code, message;
//   try {
//     code = 200;
//     message = "Data Fetched Successfully!!";
//     const Projects = await ProjectsInfoModel.find({
//       $and: [{ $and: query }],
//     }).sort(fieldName);
//     const data = customPagination({ data: Projects, page, limit });
//     const resData = customResponse({ code, message, data });
//     res.status(200).send(resData);
//   } catch (error) {
//     code = 500;
//     message = "Internal server error";
//     const resData = customResponse({
//       code,
//       message,
//       err: error,
//     });
//     return res.status(code).send(resData);
//   }
// };

//getting all the active projects
const getActiveProjects = async (req, res) => {
  const query = getQueryString(req.query);
  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 10;
  let code, message;
  try {
    const Projects = await ProjectsInfoModel.find({});
    await Projects.forEach(async (element) => {
      let date = moment().format("YYYY-MM-DD");
      // date = moment(date, "YYYY-MM-DD");
      let endDate = moment(element.endDate, "YYYY-MM-DD");

      if (element.vbProjectStatus == "On Hold" || "Yet to Begin") {
      } else if (date.isAfter(endDate)) {
        let updateElement = await ProjectsInfoModel.findOneAndUpdate(
          { _id: element._id },
          { $set: { vbProjectStatus: "Done" } }
        );
        updateElement.save();
      }
    });
    code = 200;
    message = "Data Fetched Successfully!!";
    const updatedProjects = await ProjectsInfoModel.find({
      $and: [{ $and: query }, { vbProjectStatus: "Active" }],
    });
    const data = customPagination({ data: updatedProjects, page, limit });
    const resData = customResponse({ code, message, data });
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

//getting all the active sorted projects
const getSortedActiveProjects = async (req, res) => {
  const fieldName = req.params.fieldName;
  const query = getQueryString(req.query);
  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 10;
  let code, message;
  try {
    const Projects = await ProjectsInfoModel.find({});
    await Projects.forEach(async (element) => {
      let date = moment().format("YYYY-MM-DD");
      // date = moment(date, "YYYY-MM-DD");
      let endDate = moment(element.endDate, "YYYY-MM-DD");

      if (element.vbProjectStatus == "On Hold" || "Yet to Begin") {
      } else if (date.isAfter(endDate)) {
        let updateElement = await ProjectsInfoModel.findOneAndUpdate(
          { _id: element._id },
          { $set: { vbProjectStatus: "Done" } }
        );
        updateElement.save();
      }
    });
    code = 200;
    message = "Data Fetched Successfully!!";
    const updatedProjects = await ProjectsInfoModel.find({
      $and: [{ $and: query }, { vbProjectStatus: "Active" }],
    }).sort(fieldName);
    const data = customPagination({ data: updatedProjects, page, limit });
    const resData = customResponse({ code, message, data });
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

//getting all the done projects
const getDoneProjects = async (req, res) => {
  const query = getQueryString(req.query);
  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 10;
  let code, message;
  try {
    const Projects = await ProjectsInfoModel.find({});
    await Projects.forEach(async (element) => {
      let date = moment().format("YYYY-MM-DD");
      date = moment(date, "YYYY-MM-DD");
      let startDate = moment(element.startDate, "YYYY-MM-DD");
      let endDate = moment(element.endDate, "YYYY-MM-DD");

      if (element.vbProjectStatus == "On Hold" || "Yet to Begin") {
      } else if (date.isAfter(endDate)) {
        let updateElement = await ProjectsInfoModel.findOneAndUpdate(
          { _id: element._id },
          { $set: { vbProjectStatus: "Done" } }
        );
        updateElement.save();
      }
    });
    code = 200;
    message = "Data Fetched Successfully!!";
    const updatedProjects = await ProjectsInfoModel.find({
      $and: [{ $and: query }, { vbProjectStatus: "Done" }],
    });
    const data = customPagination({ data: updatedProjects, page, limit });
    const resData = customResponse({ code, message, data });
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

//getting all the done sorted projects
const getSortedDoneProjects = async (req, res) => {
  const fieldName = req.params.fieldName;
  const query = getQueryString(req.query);
  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 10;
  let code, message;
  try {
    const Projects = await ProjectsInfoModel.find({});
    await Projects.forEach(async (element) => {
      let date = moment().format("YYYY-MM-DD");
      date = moment(date, "YYYY-MM-DD");
      let startDate = moment(element.startDate, "YYYY-MM-DD");
      let endDate = moment(element.endDate, "YYYY-MM-DD");

      if (element.vbProjectStatus == "On Hold" || "Yet to Begin") {
      } else if (date.isAfter(endDate)) {
        let updateElement = await ProjectsInfoModel.findOneAndUpdate(
          { _id: element._id },
          { $set: { vbProjectStatus: "Done" } }
        );
        updateElement.save();
      }
    });
    code = 200;
    message = "Data Fetched Successfully!!";
    const updatedProjects = await ProjectsInfoModel.find({
      $and: [{ $and: query }, { vbProjectStatus: "Done" }],
    }).sort(fieldName);
    const data = customPagination({ data: updatedProjects, page, limit });
    const resData = customResponse({ code, message, data });
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

//getting all the others  projects
const getOtherProjects = async (req, res) => {
  const query = getQueryString(req.query);
  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 10;
  let code, message;
  try {
    code = 200;
    message = "Data Fetched Successfully!!";
    const updatedProjects = await ProjectsInfoModel.find({
      $and: [
        {
          $and: query,
          $or: [
            { vbProjectStatus: "On Hold" },
            { vbProjectStatus: "Yet to Begin" },
          ],
        },
      ],
    });
    const data = customPagination({ data: updatedProjects, page, limit });
    const resData = customResponse({ code, message, data });
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

//getting all the others sorted projects
const getSortedOtherProjects = async (req, res) => {
  const fieldName = req.params.fieldName;
  const query = getQueryString(req.query);
  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 10;
  let code, message;
  try {
    code = 200;
    message = "Data Fetched Successfully!!";
    const Projects = await ProjectsInfoModel.find({
      $and: [
        {
          $and: query,
          $or: [
            { vbProjectStatus: "On Hold" },
            { vbProjectStatus: "Yet to Begin" },
          ],
        },
      ],
    }).sort(fieldName);
    const data = customPagination({ data: Projects, page, limit });
    const resData = customResponse({ code, message, data });
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

//exporting to use in other files
module.exports = {
  createProjects,
  updateProject,
  // getProjects,
  // getSortedProjects,
  getActiveProjects,
  getSortedActiveProjects,
  getDoneProjects,
  getSortedDoneProjects,
  getOtherProjects,
  getSortedOtherProjects,
  getProjectById,
};
