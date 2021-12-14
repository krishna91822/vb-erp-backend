const { Employee } = require("../models/employeeModel");
const ReviewModel = require("../models/ReviewModel");

const catchAsync = require("../middleware/catchAsync");
const AppError = require("../utility/appError");
const APIFeatures = require("../utility/apiFeatures");
const { customResponse } = require("../utility/helper");
const {
  employeeSchema,
  employeeUpdateSchema,
} = require("../schema/employeeSchema");

exports.getAllEmployees = catchAsync(async (req, res, next) => {
  //Build the query
  const features = new APIFeatures(Employee.find(), req.query)
    .filter()
    .search()
    .sort()
    // .limitFields()
    .paginate();

  //Execute the query
  const employees = await features.query;

  //Send response
  // res.status(200).json({
  //   status: "success",
  //   results: employees.length,
  //   data: {
  //     employees,
  //   },
  // });
  let code = 200;
  let message = "success";
  let data = employees;
  const resData = customResponse({ code, message, data });
  return res.status(code).send(resData);
});

exports.getEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(new AppError("No employee found with that ID", 404));
  }

  let code = 200;
  let message = "success";
  let data = employee;
  const resData = customResponse({ code, message, data });
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     employee,
  //   },
  // });
  return res.status(code).send(resData);
});

exports.createEmployee = catchAsync(async (req, res, next) => {
  /* 	#swagger.tags = ['Create Employee']
      #swagger.description = 'Create new Employee'
      #swagger.parameters['obj'] = {
        in: 'body',
        schema: {
          $empName: "name3",
          $empEmail: "name3@email.com",
          $empDoj: "11/10/90",
          $empDepartment: "Development",
          $empDesignation: "Developer Relations",
          $empBand: "90",
          $empCtc: 600000,
          $empReportingManager: "Gautam",
          $empPersonalEmail: "name3@email.com",
          $empPhoneNumber: "8984645",
          $empDob: "1/1/20",
          $empGraduation:"College_name_goes_here",
          $empAboutMe: "Tech Enthusiast",
          $empHobbies: [ "Cricket", "Movies" ],
          $empPrimaryCapability: [],
          $empSkillSet: [],
          $empCertifications: [ "AWS", "Scrum" ],
          $role: "LEADERSHIP"
        }
      }
      #swagger.responses[201] = {
        description: 'Employee created successfully.',
        schema: { 
          "status": "success",
    "code": 201,
    "message": "success",
    "data": {
        "empId": "",
        "empName": "name3",
        "empEmail": "name3@email.com",
        "empPersonalEmail": "name3@email.com",
        "empPhoneNumber": "8984645",
        "empDoj": "1990-11-09T18:30:00.000Z",
        "empDob": "2019-12-31T18:30:00.000Z",
        "empDepartment": "Development",
        "empDesignation": "Developer Relations",
        "empReportingManager": "Gautam",
        "empConnections": 0,
        "empHobbies": [
            "Cricket",
            "Movies"
        ],
        "empAboutMe": "Tech Enthusiast",
        "empCurrentAddress": "",
        "empResidentialAddress": "",
        "empBand": "90",
        "empCtc": 600000,
        "empGraduation": "College_name_goes_here",
        "empGraduationUniversity": "",
        "empPostGraduation": "",
        "empPostGraduationUniversity": "",
        "empPrimaryCapability": [],
        "empSkillSet": [],
        "empCertifications": [
            "AWS",
            "Scrum"
        ],
        "role": "LEADERSHIP",
        "slackMemId": "",
        "createdAt": "2021-12-14T11:08:22.017Z",
        "updatedAt": "2021-12-14T11:08:22.017Z",
        "count": 3
          },
          "error": {}
        }
      }
  */
  const { error } = employeeSchema.validate(req.body);
  if (error) {
    let code = 422;
    let message = "Invalid request data";
    const resData = customResponse({
      code,
      message,
      err: error && error.details,
    });
    return res.status(code).send(resData);
  }
  const newEmployee = await Employee.create(req.body);

  let code = 201;
  let message = "success";
  let data = newEmployee;
  // res.status(201).json({
  //   status: "success",
  //   data: newEmployee,
  // });
  const resData = customResponse({ code, message, data });
  return res.status(code).send(resData);
});

exports.updateEmployee = catchAsync(async (req, res, next) => {
  const { error } = employeeUpdateSchema.validate(req.body);
  if (error) {
    code = 422;
    message = "Invalid request data";
    const resData = customResponse({
      code,
      message,
      err: error && error.details,
    });
    return res.status(code).send(resData);
  }
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!employee) {
    return next(new AppError("No employee found with that ID", 404));
  }

  let code = 200;
  let message = "succcess";
  let data = employee;
  const resData = customResponse({ code, message, data });
  // res.status(200).json({
  //   status: "success",
  //   data: employee,
  // });
  return res.status(code).send(resData);
});

exports.deleteEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);

  if (!employee) {
    return next(new AppError("No employee found with that ID", 404));
  }

  let code = 204;
  let message = "success";
  // res.status(204).json({
  //   status: "success",
  //   data: null,
  // });
  const resData = customResponse({ code, message });
  return res.status(code).send(resData);
});

//For PMO integration
exports.getFilteredEmp = async (req, res) => {
  const query = req.query;
  try {
    if (Object.keys(req.query).length === 0) {
      const filterEmployee = await Employee.find(
        {},
        { empId: 1, empName: 1, empPrimaryCapability: 1 }
      );
      return res.status(200).send(filterEmployee);
    } else {
      const filterEmployee = await Employee.find(
        {
          $or: [
            {
              empName: {
                $regex: query.empName.trim(),
                $options: "i",
              },
            },
          ],
        },
        { empId: 1, empName: 1, empPrimaryCapability: 1 }
      );
      return res.status(200).send(filterEmployee);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
