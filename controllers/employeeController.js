const employeeModel = require("../models/employeeModel");

exports.index_route = function (req, res) {
  res.send("Inside Employee route");
};

exports.get_all_employees = function (req, res) {
  employeeModel.find({}, (err, empData) => {
    if (err) {
      console.log(err);
    } else {
      res.send(empData);
    }
  });
};

exports.create_employee = function (req, res) {
  const emp = new employeeModel();
  emp.empName = req.body.empName;
  emp.empId = req.body.empId;
  emp.empEmail = req.body.empEmail;
  emp.empDoj = req.body.empDoj;
  emp.empDepartment = req.body.empDepartment;
  emp.empDesignation = req.body.empDesignation;
  emp.empBand = req.body.empBand;
  emp.empCtc = req.body.empCtc;
  emp.empReportingManager = req.body.empReportingManager;
  emp.empGraduation = req.body.empGraduation;
  emp.empPostGraduation = req.body.empPostGraduation;
  emp.empPersonalEmail = req.body.empPersonalEmail;
  emp.empPhoneNumber = req.body.empPhoneNumber;
  emp.empDob = req.body.empDob;
  emp.empAboutMe = req.body.empAboutMe;
  emp.empHobbies = req.body.empHobbies;
  emp.empPrimaryCapability = req.body.empPrimaryCapability;
  emp.empSkillSet = req.body.empSkillSet;
  emp.empCertifications = req.body.empCertifications;
  emp.empRole = req.body.empRole;

  emp.save((err, doc) => {
    if (err) {
      console.log(`err is ${err}`);
      res.status(400).send(`Submit all the required fields`);
    } else {
      res.send(doc);
    }
  });
};

exports.get_employee = function (req, res) {
  employeeModel.find({ empId: req.params.empId }, (err, empData) => {
    if (err) {
      console.log(err);
    } else {
      if (empData.length === 0) {
        res.status(404).send(`Employee details not found`);
      } else {
        res.send(empData);
      }
    }
  });
};

exports.update_employee = function (req, res) {
  employeeModel.findOneAndUpdate(
    { empId: req.params.empId },
    req.body,
    {
      new: true,
      runValidators: true,
    },
    (err, docs) => {
      if (err) {
        console.log(err);
        res.status(400).send("Validation Error");
      } else {
        res.send(docs);
      }
    }
  );
};
