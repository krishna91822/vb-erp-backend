const { json } = require("body-parser");
const { reduce, values } = require("lodash");
const projectEmployeeModel = require("../models/projectEmployeeModel");

const getFilteredData = (findObj, projectDetails) => {
  let details = projectDetails;

  if (findObj.empId) {
    details = details.filter((detail) =>
      detail.empId.empId.includes(findObj.empId)
    );
  }

  if (findObj.employeeName) {
    details = details.filter((detail) =>
      detail.empId.employeeName
        .toLowerCase()
        .includes(findObj.employeeName.toLowerCase())
    );
  }

  return details;
};

const createAllocations = async (req, res) => {
  try {
    const allocation = await projectEmployeeModel(req.body);
    allocation.save();
    res.status(201).json(allocation);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAllocations = async (req, res) => {
  let query = [
    // {
    //   empId: { $regex: "", $options: "i" },
    // },
  ];
  // if (req.query.empId) {
  //     query.push({
  //         empId: req.query.empId
  //     });
  // }

  //   if (req.query.projectId) {
  //     query.push({
  //       projectId: req.query.allocationStartDate,
  //     });
  //   }
  //   if (req.query.employeeName) {
  //     console.log("Hi");
  //     query.push({
  //       employeeName: { $regex: req.query.employeeName, $options: "i" },
  //     });
  //   }

  //   if (req.query.allocationPercentage) {
  //     query.push({
  //       allocationPercentage: {
  //         $regex: req.query.allocationPercentage,
  //         // $options: "i",
  //       },
  //     });
  //   }
  // if (req.query.employeeName) {
  //     query.push({
  //         employeeName: req.query.employeeName
  //     });
  // }
  // if (req.query.projectAllocated) {
  //     query.push({
  //         projectAllocated: req.query.projectAllocated
  //     });
  // }
  // if (req.query.percentageAllocated) {
  //     query.push({
  //         percentageAllocated: req.query.percentageAllocated
  //     });
  // }
  // if (req.query.allocationStartDate) {
  //     query.push({
  //         allocationStartDate: {
  //             $regex: req.query.allocationStartDate,
  //             $options: 'i'
  //         }
  //     });
  // }
  // if (req.query.allocationEndDate) {
  //     query.push({
  //         allocationEndDate: req.query.allocationEndDate
  //     });
  // }
  // if (req.query.empId) {
  //     query.push({
  //         empId: req.query.empId,
  //     });
  // }
  // if (req.query.projectId) {
  //     query.push({
  //         projectId: req.query.projectId,
  //     });
  // }

  //   let findObj = {};
  //   if (req.query && Object.keys(req.query).length > 0) {
  //     console.log("in");
  //     findObj = {
  //       $and: [{ $and: query }],
  //     };
  //   }

  const findObj = {};
  if (req.query.empId) {
    findObj.empId = req.query.empId;
  }

  if (req.query.employeeName) {
    findObj.employeeName = req.query.employeeName;
  }

  try {
    const projectDetails = await projectEmployeeModel
      .find({})
      .populate("empId", "_id empId employeeName")
      .populate(
        "projectId",
        "_id vbProjectId startDate endDate vbProjectStatus"
      );

    const filteredData = getFilteredData(findObj, projectDetails);

    res.status(200).json(filteredData);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete Request
const deleteAllocation = async (req, res) => {
  try {
    const deleteResource = await projectEmployeeModel.findByIdAndDelete(
      req.params.id
    );
    res.status(200).send(deleteResource);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update request
const updateAllocation = async (req, res) => {
  try {
    const _id = req.params.id;
    const updateResource = await projectEmployeeModel.findOneAndUpdate(
      { empId: _id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).send(updateResource);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createAllocations,
  getAllocations,
  deleteAllocation,
  updateAllocation,
};

// filtering on allocations on all fields
// for allocation list, create new route and get data whose allocation is more than 0
// for onbench list, create new route and get data whose allocation is less than 100 (reduce + filter for less than 100)
// for total allocation, create new route and return total allocation filtering on empId (total allocation reduce)
// for projects list, create two routes, one for active projects and one for past projects
//// active projects, show all except closed status
//// past projects, show all closed status
