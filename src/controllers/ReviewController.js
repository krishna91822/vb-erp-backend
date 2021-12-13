const Review = require("../models/ReviewModel");
const Employee = require("../models/employeeModel");
const { reviewSchema, reviewupdatedSchema } = require("../Validation/reviews");

const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  //Build the query
  const features = new APIFeatures(Review.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  //Execute the query
  const reviews = await features.query;

  //Send response
  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError("No review found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
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

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    data: newReview,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { error } = reviewupdatedSchema.validate(req.body);
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

  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!review) {
    return next(new AppError("No review found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: review,
  });
});

exports.updateReviewStatus = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!review) {
    return next(new AppError("No review found with that ID", 404));
  }

  const employeeData = {
    ...review.employeeDetails._doc,
    password: "12345",
    passwordConfirm: "12345",
  };

  // check and create employee
  if (review.reqType === "profile-creation" && req.body.status === "accepted") {
    const newEmployee = await Employee.create(employeeData);
    if (!newEmployee) {
      await Review.findByIdAndUpdate(
        req.params.id,
        { status: "pending" },
        {
          new: true,
          runValidators: true,
        }
      );
      return next(new AppError("Fail to create employee try again", 404));
    }
    console.log(newEmployee);

    return res.status(200).json({
      status: "success",
      result: "Employee created",
      data: review,
    });
  }

  //check and update employee
  const employeeDataToUpdate = {
    ...review.employeeDetails._doc,
  };

  if (review.reqType === "profile-update" && req.body.status === "accepted") {
    const employee = await Employee.findOneAndUpdate(
      { empEmail: review.employeeDetails.empEmail },
      employeeDataToUpdate,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!employee) {
      await Review.findByIdAndUpdate(
        req.params.id,
        { status: "pending" },
        {
          new: true,
          runValidators: true,
        }
      );
      return next(new AppError("Fail to update employee try again", 404));
    }
    console.log(employee);

    return res.status(200).json({
      status: "success",
      result: "Employee updated",
      data: review,
    });
  }

  res.status(200).json({
    status: "success",
    data: review,
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  if (!review) {
    return next(new AppError("No review found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
