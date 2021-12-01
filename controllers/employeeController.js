const Employee = require('./../models/employeeModel');
const ReviewModel = require('../models/ReviewModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/APIFeatures');

exports.getAllEmployees = catchAsync(async (req, res, next) => {
  //Build the query
  const features = new APIFeatures(Employee.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  //Execute the query
  const employees = await features.query;

  //Send response
  res.status(200).json({
    status: 'success',
    results: employees.length,
    data: {
      employees,
    },
  });
});

exports.getEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(new AppError('No employee found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      employee,
    },
  });
});

exports.createEmployee = catchAsync(async (req, res, next) => {
  const newEmployee = await Employee.create(req.body);

  res.status(201).json({
    status: 'success',
    data: newEmployee,
  });
});

exports.updateEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!employee) {
    return next(new AppError('No employee found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: employee,
  });
});

exports.deleteEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);

  if (!employee) {
    return next(new AppError('No employee found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
