const ReviewSchema = require("../models/ReviewModel");
const EmployeeModel = require("../models/employeeModel");

const GetReviews = async (req, res) => {
  try {
    let result = await ReviewSchema.find({});
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
  }
};

const GetIdReview = async (req, res) => {
  try {
    let result = await ReviewSchema.find({ ReqId: req.params.ReqId });
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
  }
};

const ChangeStatus = async (req, res) => {
  if (req.body.Status === "Accepted") {
    try {
      const data = await ReviewSchema.updateOne(
        { ReqId: req.params.ReqId },
        { Status: req.body.Status }
      );
      const EmpData = {};
      EmpData.empName = req.body.empName;
      EmpData.empId = req.body.empId;
      EmpData.empEmail = req.body.empEmail;
      EmpData.empDoj = req.body.empDoj;
      EmpData.empDepartment = req.body.empDepartment;
      EmpData.empDesignation = req.body.empDesignation;
      EmpData.empBand = req.body.empBand;
      EmpData.empCtc = req.body.empCtc;
      EmpData.empReportingManager = req.body.empReportingManager;
      EmpData.empGraduation = req.body.empGraduation;
      EmpData.empPostGraduation = req.body.empPostGraduation;
      EmpData.empPersonalEmail = req.body.empPersonalEmail;
      EmpData.empPhoneNumber = req.body.empPhoneNumber;
      EmpData.empDob = req.body.empDob;
      EmpData.empAboutMe = req.body.empAboutMe;
      EmpData.empHobbies = req.body.empHobbies;
      EmpData.empPrimaryCapability = req.body.empPrimaryCapability;
      EmpData.empSkillSet = req.body.empSkillSet;
      EmpData.empCertifications = req.body.empCertifications;
      EmpData.empRole = req.body.empRole;
      if (req.body.ReqType === "Profile Update") {
        const employee = await EmployeeModel.updateOne(
          { empId: req.body.empId },
          { ...EmpData }
        );
      } else if (req.body.ReqType === "Profile Create") {
        const employee = await EmployeeModel.create({ ...EmpData });
      }
      return res.status(200).send(EmpData);
    } catch (error) {
      console.log(error);
      return res.status(204).send("No Content");
    }
  } else if (req.body.Status === "Rejected") {
    try {
      const { Status } = req.body.Status;
      const data = await ReviewSchema.updateOne(
        { empId: req.body.empId },
        { ...req.body, Status: Status }
      );
      console.log("rejected");
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(204).send("No Content");
    }
  }
};

module.exports = { GetReviews, GetIdReview, ChangeStatus };
