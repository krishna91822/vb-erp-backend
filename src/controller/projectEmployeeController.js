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
    let query = [
        // allocationStartDate: { $regex: "", $options: 'i' }
    ];
    if (req.query.empId) {
        query.push({
            empId: req.query.empId,
        });
    }
    if (req.query.projectId) {
        query.push({
            projectId: req.query.projectId
        });
    }
    if (req.query.employeeName) {
        query.push({
            employeeName: req.query.employeeName
        });
    }
    if (req.query.projectAllocated) {
        query.push({
            projectAllocated: req.query.projectAllocated
        });
    }
    if (req.query.percentageAllocated) {
        query.push({
            percentageAllocated: req.query.percentageAllocated
        });
    }
    // if (req.query.allocationStartDate) {
    //     query.push({
    //         allocationStartDate: {
    //             $regex: req.query.allocationStartDate,
    //             $options: 'i'
    //         }
    //     });
    // }
    if (req.query.allocationEndDate) {
        query.push({
            allocationEndDate: req.query.allocationEndDate
        });
    }
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
    try {
        console.log(query)
        const projectDetails = await projectEmployeeModel.find({
                $and: [{ $and: query }]
            })
            .populate("empId", "_id empId employeeName")
            .populate("projectId");
        res.status(200).json(projectDetails);
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    createAllocations,
    getAllocations
};



// update
// delete
// filter by empId, employeeName, ProjectAllocated, percentageAllocated, startDate & endDate --- Allocations View/Allocated View
// filter by employee Id, employeeName, lastProjectAllocated, lastAllocationDate, SkillsSet ----- Allocations View/OnBench View