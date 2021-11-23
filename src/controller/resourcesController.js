// importing required Files and Routes
const { json } = require("body-parser");
const ResourceInfoModel = require("../models/resourcesModel");

// Creating and Storing Resources data into database by POST request
const createResource = async(req, res) => {
    let newResource = new ResourceInfoModel({
        associateName: req.body.associateName,
        allocationStartDate: req.body.allocationStartDate,
        allocationEndDate: req.body.allocationEndDate,
        allocationPercentage: req.body.allocationPercentage,
        rackRate: req.body.rackRate,
        empId: req.body.empId,
        projectAllocated: req.body.projectAllocated,
    });

    try {
        const resource = await newResource.save();
        res.status(201).json(resource);
    } catch (error) {
        res.status(400).json(error);
    }
}

//getting all the resources list (Allocations Page)
const getResources = async(req, res) => {
    try {
        const getResources = await ResourceInfoModel.find({});
        res.status(200).send(getResources);
    } catch (error) {
        res.status(400).send(error);
    }
};

//getting individual  resource by its id
const getResourceById = async(req, res) => {
    try {
        const _id = req.params.id
        const getResourceById = await ResourceInfoModel.findById(_id);
        res.status(200).send(getResourceById);
    } catch (error) {
        res.status(400).send(error);
    }
};

//updating individual project by its id
const updateResources = async(req, res) => {
    try {
        const _id = req.params.id
        const updateResources = await ResourceInfoModel.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.status(200).send(updateResources);

    } catch (error) {
        res.status(400).send(error);
    }
};

//exporting to use in other files
module.exports = { getResources, getResourceById, createResource, updateResources };