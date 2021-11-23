const employeeModel = require("../models/employeeModel");

async function getAllEmployees(req, res) {
  try {
    let result = await employeeModel.find({});
    res.send(result);
  } catch (err) {
    console.log(err);
  }
}

async function createEmployee(req, res) {
  const data = req.body;
  const emp = new employeeModel(data);

  try {
    let result = await emp.save();
    res.send(result);
  } catch (err) {
    console.log(`err is ${err}`);
    res.status(400).send(`Submit all the required fields in correct format`);
  }
}

async function getEmployee(req, res) {
  try {
    let result = await employeeModel.findOne({ empId: req.params.empId });
    // console.log(`result is ${result}`);
    if (result === null) {
      throw err;
    }
    res.send(result);
  } catch (err) {
    res.status(404).send(`Employee details not found`);
  }
}

async function updateEmployee(req, res) {
  try {
    let result = await employeeModel.findOneAndUpdate(
      { empId: req.params.empId },
      req.body,
      { new: true, runValidators: true }
    );
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send("Validation Error");
  }
}

module.exports = {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
};
