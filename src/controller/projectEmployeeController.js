const { json } = require("body-parser");
const projectEmployeeModel = require("../models/projectEmployeeModel");
const {
  getAllocationQuery,
  getAllocationsFilteredData,
  getOnBenchFilteredData,
  getTotalAllocationCalculated,
} = require("../utility/pmoUtils");
//JOI
const { projectEmployeeSchema } = require("../schema/projectEmployeeSchema");
const { customResponse, customPagination } = require("../utility/helper");

// Create request
const createAllocations = async (req, res) => {
  try {
    let allocation;
    const { projectId, resources } = req.body;
    const resourcesToInsert = resources.map((eachResource) => ({
      ...eachResource,
      projectId,
    }));
    allocation = await projectEmployeeModel.insertMany(resourcesToInsert);
    res.status(201).json(allocation);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Update request for updating the allocation and creating new resources
const updateAllocation = async (req, res) => {
  try {
    const { projectId } = req.params;
    const updateResource = await projectEmployeeModel.find({
      empId: req.body.empId,
      projectId,
    });

    if (updateResource.length === 0) {
      let allocation = await projectEmployeeModel.insertMany(req.body);
      return res.status(200).send(allocation);
    }
    res.status(400).json({ message: "Employee already allocated!" });
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
      .find({ query })
      .populate("empId", "_id empId empName")
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
      .populate("empId", "_id empId empName")
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
      .populate("empId", "_id empId empName")
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
