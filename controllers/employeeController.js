const employeeModel = require("../models/employeeModel");
const ReviewModel = require("../models/ReviewModel");
var randomString = require("randomstring");

exports.index_route = function (req, res) {
  res.send("Inside Employee route");
};

exports.get_all_employees = async function (req, res) {
  try {
    let result = await employeeModel.find({});
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

exports.create_employee = async function (req, res) {
  const data = req.body;
  const emp = new employeeModel(data);

  try {
    let result = await emp.save();
    res.send(result);
  } catch (err) {
    console.log(`err is ${err}`);
    res.status(400).send(`Submit all the required fields in correct format`);
  }
};

exports.get_employee = async function (req, res) {
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

exports.update_employee = async function (req, res) {
  let ReqId = randomString.generate(8);
  try {
    const { empId } = req.params;
    const data = await ReviewModel.insertOne({
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
