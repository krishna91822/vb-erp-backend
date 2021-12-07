const { json } = require("body-parser");
const projectEmployeeModel = require("../models/projectEmployeeModel");
const {
  getAllocationQuery,
  getAllocationsFilteredData,
  getOnBenchFilteredData,
  getTotalAllocationCalculated,
} = require("../utils/pmoUtils");

// Create request
const createAllocations = async (req, res) => {
  try {
    const allocation = await projectEmployeeModel(req.body);
    allocation.save();
    res.status(201).json(allocation);
  } catch (error) {
    res.status(400).json(error);
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

// Get allocations
const getAllocations = async (req, res) => {
  const query = getAllocationQuery(req.query);

  try {
    const projectDetails = await projectEmployeeModel
      .find({})
      .populate("empId", "_id empId employeeName")
      .populate(
        "projectId",
        "_id vbProjectId startDate endDate vbProjectStatus projectName"
      );

    const filteredData = getAllocationsFilteredData(query, projectDetails);

    res.status(200).json(filteredData);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllocationsOnBench = async (req, res) => {
  const query = getAllocationQuery(req.query);

  try {
    const projectDetails = await projectEmployeeModel
      .find({})
      .populate("empId", "_id empId employeeName")
      .populate(
        "projectId",
        "_id vbProjectId startDate endDate vbProjectStatus projectName"
      );

    const filteredData = getOnBenchFilteredData(query, projectDetails);

    res.status(200).json(filteredData);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getTotalAllocationByEmpId = async (req, res) => {
  let empId = "";

  if (req.query.empId) {
    empId = req.query.empId;
  }

  try {
    const projectDetails = await projectEmployeeModel
      .find({})
      .populate("empId", "_id empId employeeName")
      .populate(
        "projectId",
        "_id vbProjectId startDate endDate vbProjectStatus projectName"
      );

    const totalAllocation = getTotalAllocationCalculated(empId, projectDetails);

    res.status(200).json(totalAllocation);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createAllocations,
  updateAllocation,
  deleteAllocation,
  getAllocations,
  getAllocationsOnBench,
  getTotalAllocationByEmpId,
};

// let query = [
// {
//   empId: { $regex: "", $options: "i" },
// },
// ];
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
