//const employeesModal = require("../models/employeeModel");
// const { customResponse, customPagination } = require("../utility/helper");

// const storeEmployee = async (req, res) => {
//   let code, message;
//   try {
//     code = 201;
//     const employees = await new employeesModal(req.body);
//     employees.save();
//     const resdata = customResponse({ code, data: employees });
//     return res.status(code).send(resdata);
//   } catch (error) {
//     code = 500;
//     message = "Internal server error";
//     const resData = customResponse({
//       code,
//       message,
//       err: error,
//     });
//     return res.status(code).send(resData);
//   }
// };

const { Employee } = require("../models/employeeModel");
const APIFeatures = require("../utility/apiFeatures");
const { customResponse } = require("../utility/helper");
const {
  employeeSchema,
  employeeUpdateSchema,
} = require("../schema/employeeSchema");
const mongoose = require("mongoose");
const QRCode = require("qrcode");
const {
  getDepartmentsData,
  getDesignationsData,
} = require("../utility/dropdown");

exports.getAllEmployees = async (req, res) => {
  /* 	#swagger.tags = ['Employee']
      #swagger.description = 'Get All Employees from database' 
      #swagger.parameters['page'] = {
        in: 'query',
        type: 'integer',
        description: 'Page number' 
      }
      #swagger.parameters['limit'] = {
        in: 'query',
        type: 'integer',
        description: 'Data limit per page' 
      }
      #swagger.responses[200] = {
        schema:{
          "status": "success",
          "code": 200,
          "message": "success",
          "data": [
             {
            "empId": "VB002",
            "empName": "name2",
            "empEmail": "name2@email.com",
            "empPersonalEmail": "name2@email.com",
            "empPhoneNumber": "898100684645",
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
            "createdAt": "2021-12-14T10:45:15.026Z",
            "updatedAt": "2021-12-14T10:45:15.035Z",
            "count": 2,
        },
        {
            "empId": "VB003",
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
            "updatedAt": "2021-12-14T11:08:22.046Z",
            "count": 3,
        }
          ],
          "error": {}
        }
      }
  */
  let code, message;
  try {
    //Build the query
    const features = new APIFeatures(Employee.find(), req.query)
      .filter()
      .search()
      .sort()
      // .limitFields()
      .paginate();

    //Execute the query
    const employees = await features.query;

    code = 200;
    message = "success";
    let data = employees;
    const resData = customResponse({ code, message, data });
    return res.status(code).send(resData);
  } catch (error) {
    console.log(`error is ${JSON.stringify(error)}`);
    code = 500;
    message = "Internal server error";
    const resData = customResponse({
      code,
      message,
      err: error,
    });
    return res.status(code).send(resData);
  }
};

exports.getEmployee = async (req, res) => {
  /*#swagger.tags = ['Employee']
  #swagger.description = 'Create new Employee'
  #swagger.responses[200] = {
        description: 'Get Employee By id successful.',
        schema: { 
          "status": "success",
    "code": 200,
    "message": "success",
    "data": {
        "empId": "VB002",
        "empName": "name2",
        "empEmail": "name2@email.com",
        "empPersonalEmail": "name2@email.com",
        "empPhoneNumber": "898100684645",
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
        "createdAt": "2021-12-14T10:45:15.026Z",
        "updatedAt": "2021-12-14T10:45:15.035Z",
        "count": 2,
          },
          "error": {}
        }
      }*/
  let code, message;
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) {
    code = 422;
    message = "Invalid objectId id";
    const resData = customResponse({ code, message });
    return res.status(code).send(resData);
  }
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      code = 500;
      message = "Employee not found by given id";
      const resData = customResponse({
        code,
        message,
        err: error,
      });
      return res.status(code).send(resData);
    }

    code = 200;
    message = "success";
    let data = employee;
    const resData = customResponse({ code, message, data });
    return res.status(code).send(resData);
  } catch (error) {
    console.log(`error is ${JSON.stringify(error)}`);
    code = 500;
    message = "Internal server error";
    const resData = customResponse({
      code,
      message,
      err: error,
    });
    return res.status(code).send(resData);
  }
};

exports.createEmployee = async (req, res) => {
  /*#swagger.tags = ['Employee']
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
      }*/
  let code, message;
  try {
    const { error } = employeeSchema.validate(req.body);
    if (error) {
      console.log(`error is ${JSON.stringify(error)}`);
      code = 422;
      message = "Invalid request data";
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
    const resData = customResponse({ code, message, data });
    return res.status(code).send(resData);
  } catch (error) {
    console.log(`error is ${JSON.stringify(error)}`);
    code = 500;
    message = "Internal server error";
    const resData = customResponse({
      code,
      message,
      err: error,
    });
    return res.status(code).send(resData);
  }
};

exports.updateEmployee = async (req, res) => {
  /*#swagger.tags = ['Employee']
  #swagger.description = 'Update Employee'
      #swagger.parameters['obj'] = {
        in: 'body',
        schema: {
          $role:"USER",
          $empGraduation:"College Name",
          $empEmail:"user2@email.com",
          $empPrimaryCapability:["Frontend","Git"]
        }
      }
      #swagger.responses[200] = {
        description: 'Employee updated successfully.',
        schema: { 
          "status": "success",
    "code": 200,
    "message": "success",
    "data": {
      "empId": "VB002",
        "empName": "name2",
        "empEmail": "user2@email.com",
        "empPersonalEmail": "name2@email.com",
        "empPhoneNumber": "898100684645",
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
        "empGraduation": "College Name",
        "empGraduationUniversity": "",
        "empPostGraduation": "",
        "empPostGraduationUniversity": "",
        "empPrimaryCapability": [
            "Frontend",
            "Git"
        ],
        "empSkillSet": [],
        "empCertifications": [
            "AWS",
            "Scrum"
        ],
        "role": "USER",
        "slackMemId": "",
        "createdAt": "2021-12-14T10:45:15.026Z",
        "updatedAt": "2021-12-16T04:10:14.205Z",
        "count": 2,
          },
          "error": {}
        }
      }*/
  let code, message;
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) {
    code = 422;
    message = "Invalid objectId id";
    const resData = customResponse({ code, message });
    return res.status(code).send(resData);
  }
  try {
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
      code = 500;
      message = "Update employee by id failed";
      const resData = customResponse({
        code,
        message,
        err: error,
      });
      return res.status(code).send(resData);
    }

    code = 200;
    message = "succcess";
    let data = employee;
    const resData = customResponse({ code, message, data });
    return res.status(code).send(resData);
  } catch (error) {
    code = 500;
    message = "Update employee by id failed";
    const resData = customResponse({
      code,
      message,
      err: error,
    });
    return res.status(code).send(resData);
  }
};

exports.deleteEmployee = async (req, res) => {
  /*#swagger.tags = ['Employee']
  #swagger.description = 'Delete Employee'
      #swagger.responses[200] = {
        description: 'Employee deleted successfully.',
        schema: { 
          "status": "",
    "code": 204,
    "message": "",
    "data": {        
          },
          "error": {}
        }
      }*/
  let code, message;
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  console.log(`isValid is ${isValid}`);
  if (!isValid) {
    code = 422;
    message = "Invalid objectId id";
    const resData = customResponse({ code, message });
    console.log(`before return`);
    return res.status(code).send(resData);
  }
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      code = 500;
      message = "Employee delete by id has failed";
      const resData = customResponse({
        code,
        message,
        err: error,
      });
      return res.status(code).send(resData);
    }

    code = 204;
    message = "Employee successfully deleted";
    const resData = customResponse({ code, message });
    return res.status(code).send(resData);
  } catch (error) {
    console.log(`error is ${JSON.stringify(error)}`);
    code = 500;
    message = "Employee delete by id has failed";
    const resData = customResponse({
      code,
      message,
      err: error,
    });
    return res.status(code).send(resData);
  }
};

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

exports.getManagers = async (req, res) => {
  const filterManagers = await EmployeeInfoModel.find(
    {
      $or: [
        {
          empDesignation: "Manager",
          empName: {
            $regex: req.query.empName,
            $options: "i",
          },
        },
      ],
    },
    { _id: 0, empName: 1 }
  );
  return res.status(200).send(filterManagers);
};

exports.generateQR = async (req, res) => {
  // #swagger.tags = ['Generate QR code']
  try {
    res.send(await QRCode.toDataURL(`https://www.geeksforgeeks.org/`));
    //`http://localhost:3000/employees/${req.params.id}`));
  } catch (err) {
    console.error(err);
  }
};

exports.getDesignations = (req, res) => {
  let code, message;
  try {
    code = 200;
    message = "success";
    const data = getDesignationsData();
    const resData = customResponse({ code, message, data });
    return res.status(200).send(resData);
  } catch (error) {
    console.log(error);
    code = 500;
    message = "Internal server error";
    const resData = customResponse({
      code,
      message,
      err: error,
    });
    return res.status(code).send(resData);
  }
};

exports.getDepartments = (req, res) => {
  let code, message;
  try {
    code = 200;
    message = "success";
    const data = getDepartmentsData();
    const resData = customResponse({ code, message, data });
    return res.status(200).send(resData);
  } catch (error) {
    console.log(error);
    code = 500;
    message = "Internal server error";
    const resData = customResponse({
      code,
      message,
      err: error,
    });
    return res.status(code).send(resData);
  }
};
