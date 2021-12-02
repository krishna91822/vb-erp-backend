const { json } = require("body-parser");
const projectEmployeeModel = require("../models/projectEmployeeModel");

const createAllocations = async(req, res) => {
    try {
        const allocation = await projectEmployeeModel(req.body);
        allocation.save();
        res.status(201).json(allocation);
    } catch (error) {
        res.status(400).json(error);
    }
};

const getAllocations = async(req, res) => {
    const searchString = [];
    if (req.query.empId) {
        searchString.push({
            empId: req.query.empId,
        });
    }
    if (req.query.projectId) {
        searchString.push({
            projectId: req.query.projectId,
        });
    }
    try {
        const projectDetails = await projectEmployeeModel.find({
                $and: [{ $and: searchString }]
            })
            .populate("empId", "_id empId employeeName")
            .populate("projectId");
        res.status(200).json(projectDetails);
        console.log(projectDetails);
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    createAllocations,
    getAllocations
};