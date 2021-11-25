const employeeModel = require("../models/employeeModel");
const ReviewModel = require("../models/ReviewModel");
const { v4: uuidv4 } = require("uuid");

const getAllEmployees = async (req, res) => {
  try {
    let result = await employeeModel.find({});
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

const createEmployee = async (req, res) => {
  let ReqId = uuidv4();
  let Reqtype = "Profile Create";
  try {
    const data = await ReviewModel.create({
      ...req.body,
      Reqtype,
      ReqId,
    });

    res.status(201).send(data);
  } catch (err) {
    console.log(`err is ${err}`);
    res.status(400).send(`Submit all the required fields in correct format`);
  }
};

const getEmployee = async (req, res) => {
  try {
    let result = await employeeModel.findOne({ empId: req.params.empId });
    if (result === null) {
      return res.status(500).send({ message: "Employee details not found" });
    }
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Employee details not found`);
  }
};

const updateEmployee = async (req, res) => {
  let ReqId = uuidv4();
  try {
    const { empId } = req.params;
    const data = await ReviewModel.insertMany({
      ...req.body,
      empId: empId,
      ReqId: ReqId,
    });
    await data.save();
    console.log(data);
    res.status(201).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send("Validation Error");
  }
};

module.exports = {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
};
