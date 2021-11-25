const employeeModel = require("../models/employeeModel");
const ReviewModel = require("../models/ReviewModel");
const { v4: uuidv4 } = require("uuid");

exports.index_route = function (req, res) {
  res.send("Inside Employee route");
};

const get_all_employees = async (req, res) => {
  try {
    let result = await employeeModel.find({});
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

const create_employee = async (req, res) => {
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

const get_employee = async (req, res) => {
  try {
    let result = await employeeModel.findOne({ empId: req.params.empId });
    console.log(`result is ${result}`);
    if (result === null) {
      throw err;
    }
    res.send(result);
  } catch (err) {
    res.status(404).send(`Employee details not found`);
  }
};

const update_employee = async (req, res) => {
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
  create_employee,
  get_all_employees,
  get_employee,
  update_employee,
};
