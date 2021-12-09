const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const Employee = require("./../models/employeeModel");
const catchAsync = require("../utility/catchAsync");
const AppError = require("../utility/appError");

// const signToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET.trim(), {
//     expiresIn: process.env.JWT_EXPIRES_IN.trim(),
//   });
// };

// exports.signup = catchAsync(async (req, res, next) => {
//   const newEmployee = await Employee.create(req.body);

//   const token = signToken(newEmployee._id);

//   res.status(201).json({
//     status: 'success',
//     token,
//     data: {
//       employee: newEmployee,
//     },
//   });
// });

// exports.login = catchAsync(async (req, res, next) => {
//   const { empEmail, password } = req.body;

//   //1) Check if email and password exist
//   if (!empEmail || !password) {
//     return next(new AppError('Please provide email and password!!!', 400));
//   }

//   //2) Check if employee exists && password correct!!!
//   //also to select fields which are not selected in schema use select with '+' operator in front of the fields
//   const employee = await Employee.findOne({ empEmail }).select('+password');
//   if (
//     !employee ||
//     !(await employee.correctPassword(password, employee.password))
//   ) {
//     return next(new AppError('Incorrect email and passwrod', 401));
//   }

//   //3) If everything ok, send token to client
//   const token = signToken(employee._id);

//   res.status(200).json({
//     status: 'success',
//     token,
//   });
// });

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if its there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in please login to get access", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET.trim()
  );

  // 3) Check if employee still exists
  const loggedEmployee = await Employee.findOne({ empEmail: decoded.email });
  if (!loggedEmployee) {
    return next(
      new AppError("The employee with this token no longer exist!!", 401)
    );
  }

  // // 4) Check if employee changed password after the token was issued
  // if (loggedEmployee.changedPasswordAfterToken(decoded.iat)) {
  //   return next(
  //     new AppError(
  //       "Employee recently changed the password. please login again...",
  //       401
  //     )
  //   );
  // }

  //Grant access to the protected raoutes
  req.role = loggedEmployee.role; //this is important to store current employee data
  console.log(`req.role is ${req.role}`);
  next();
});

exports.restrictTo = (roles) => {
  return (req, res, next) => {
    //roles is an array ex ['user','admin']
    console.log(`check is ${roles.includes(req.role)}`);
    if (!roles.includes(req.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};
