const { json } = require("body-parser");
const projectEmployeeModel = require("../models/projectEmployeeModel");
const { Employee } = require("../models/employeeModel");
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
const createAllocations = async(req, res) => {
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

const updateAllocation = async(req, res) => {
    try {
        let allocation;
        const { projectId, resources } = req.body;
        const newResources = resources.filter((eachResource) => !eachResource._id);
        const resourcesToInsert = newResources.map((eachResource) => ({
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
// const updateAllocation = async (req, res) => {
//   try {
//     const { projectId } = req.params;
//     const updateResource = await projectEmployeeModel.find({
//       empId: req.body.empId,
//       projectId,
//     });

//     if (updateResource.length === 0) {
//       let allocation = await projectEmployeeModel.insertMany(req.body);
//       return res.status(200).send(allocation);
//     }
//     res.status(400).json({ message: "Employee already allocated!" });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// Delete Request
const deleteAllocation = async(req, res) => {
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
const getAllocations = async(req, res) => {
    const query = getAllocationQuery(req.query);
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;
    let code, message;
    try {
        code = 200;
        message = "Displayed Successfully";
        const projectDetails = await projectEmployeeModel
            .find({})
            .populate("empId", "_id empId empName")
            .populate(
                "projectId",
                "_id vbProjectId startDate endDate vbProjectStatus projectName"
            );

        const filteredData = getAllocationsFilteredData(query, projectDetails);
        const data = customPagination({ data: filteredData, page, limit });
        const resData = customResponse({ code, message, data });
        res.status(code).send(resData);
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

// Get Sorted allocations
const getSortedAllocations = async(req, res) => {
    const fieldName = req.params.fieldName;
    const query = getAllocationQuery(req.query);
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;
    let code, message;
    try {
        code = 200;
        message = "Displayed Successfully";
        const projectDetails = await projectEmployeeModel
            .find({})
            .populate("empId", "_id empId empName")
            .populate(
                "projectId",
                "_id vbProjectId startDate endDate vbProjectStatus projectName"
            )
            .sort(fieldName);

        const filteredData = getAllocationsFilteredData(query, projectDetails);
        const data = customPagination({ data: filteredData, page, limit });
        const resData = customResponse({ code, message, data });
        res.status(code).send(resData);
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

//GET on Bench
const getAllocationsOnBench = async(req, res) => {
    const query = getAllocationQuery(req.query);
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;
    let code, message;
    try {
        code = 200;
        message = "Displayed Successfully";
        const projectDetails = await projectEmployeeModel
            .find({})
            .populate("empId", "_id empId empName empPrimaryCapability")
            .populate(
                "projectId",
                "_id vbProjectId startDate endDate vbProjectStatus projectName"
            );
        const employeesData = await Employee.find({}, { empId: 1, empName: 1, empPrimaryCapability: 1 });

        const filteredData = getOnBenchFilteredData(
            query,
            projectDetails,
            employeesData
        );
        const data = customPagination({ data: filteredData, page, limit });
        const resData = customResponse({ code, message, data });
        res.status(code).send(resData);
    } catch (error) {
        res.status(400).send(error);
    }
};

//Get sorted On bench
const getSortedAllocationsOnBench = async(req, res) => {
    const fieldName = req.params.fieldName;
    const query = getAllocationQuery(req.query);
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;
    let code, message;
    try {
        code = 200;
        message = "Displayed Successfully";
        const projectDetails = await projectEmployeeModel
            .find({})
            .populate("empId", "_id empId empName empPrimaryCapability")
            .populate(
                "projectId",
                "_id vbProjectId startDate endDate vbProjectStatus projectName"
            );
        const employeesData = await Employee.find({}, { empId: 1, empName: 1, empPrimaryCapability: 1 }).sort(fieldName);

        const filteredData = getOnBenchFilteredData(
            query,
            projectDetails,
            employeesData
        );
        const data = customPagination({ data: filteredData, page, limit });
        const resData = customResponse({ code, message, data });
        res.status(code).send(resData);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getTotalAllocationByEmpId = async(req, res) => {
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

//For EI integration
//For PMO integration with Employee
const getFilteredEmployee = async(req, res) => {
    const query = req.query;
    try {
        if (Object.keys(req.query).length === 0) {
            const filterEmployee = await Employee.find({}, { empId: 1, empName: 1, empPrimaryCapability: 1 });
            return res.status(200).send(filterEmployee);
        } else {
            const filterEmployee = await Employee.find({
                $or: [{
                    empName: {
                        $regex: query.empName.trim(),
                        $options: "i",
                    },
                }, ],
            }, { empId: 1, empName: 1, empPrimaryCapability: 1 });
            return res.status(200).send(filterEmployee);
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

//Managers
const getManagers = async(req, res) => {
    try {
        const filterManagers = await Employee.find({
            $or: [{
                empDesignation: "Manager",
                empName: {
                    $regex: req.query.empName,
                    $options: "i",
                },
            }, ],
        }, { _id: 1, empName: 1 });
        return res.status(200).send(filterManagers);
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    createAllocations,
    updateAllocation,
    deleteAllocation,
    getAllocations,
    getSortedAllocations,
    getAllocationsOnBench,
    getSortedAllocationsOnBench,
    getTotalAllocationByEmpId,
    getFilteredEmployee,
    getManagers,
};