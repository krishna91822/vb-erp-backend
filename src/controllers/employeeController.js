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
  employee.getFormattedEmpId(function (docs) {
    console.log(docs);
    console.log(typeof docs);
  });

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
