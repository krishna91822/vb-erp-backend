const Review = require("../models/ReviewModel");
const { Employee } = require("../models/employeeModel");
const { reviewSchema, reviewupdatedSchema } = require("../schema/reviews");

const AppError = require("../utility/appError");
const APIFeatures = require("../utility/apiFeatures");
const { customResponse } = require("../utility/helper");

exports.getAllReviews = async (req, res) => {
  /* 	#swagger.tags = ['Review']
      #swagger.description = 'Get reviews list' 
      #swagger.responses[200] = {
        schema:{
          "status": "success",
          "message": "",
          "data": {
            "results": [
              {
                "_id": "610d090636ba149966bd3b55",
               "createdAt":"2021-11-26T09:25:14.681Z",
               "updatedAt":"2021-11-26T09:25:14.681Z"
              }
            ]
          },
          "error": {}
        }
      }
  */
  try {
    //Build the query
    const features = new APIFeatures(Review.find(), req.query)
      .filter()
      .searchReview()
      .sort()
      .limitFields()
      .paginate();

    //Execute the query
    const reviews = await features.query;
    const countDoc = await Review.count({});

    //Send response
    let code = 200;
    let message = "success";
    let data = { reviews };
    let totalDocuments = countDoc;
    let totalResult = reviews.length;
    const resData = customResponse({
      code,
      message,
      data,
      totalDocuments,
      totalResult,
    });
    return res.status(code).json(resData);
  } catch (err) {
    console.log(error);
  }
};

exports.getReview = async (req, res) => {
  /* 	#swagger.tags = ['Review']
      #swagger.description = 'Get reviews list' 
      #swagger.responses[200] = {
        schema:{
          "status": "success",
          "message": "",
          "data": {
            "results": [
              {
                "_id": "61af3ce7fd077c922fadd9ba",
      "reqId": 10,
      "reqName": "admin",
      "reqType": "profile-creation",
      "status": "pending",
      "employeeDetails": {
        "slackMemId": "",
        "empName": "alan sajan",
        "empEmail": "sajan@mail.com",
        "empDoj": "2021-11-20T00:00:00.000Z",
        "empDob": "2021-11-20T00:00:00.000Z",
        "empDepartment": "sales",
        "empDesignation": "marketing",
        "empReportingManager": "sunilee",
        "empConnections": 10,
        "empHobbies": [
          "Music",
          "Dance"
        ],
        "empAboutMe": "i'm always cool..!",
        "empCurrentAddress": "gujrat",
        "empResidentialAddress": "gujrat",
        "empBand": "12",
        "empGraduation": "bba",
        "empGraduationUniversity": "du",
        "empPostGraduation": "mba",
        "empPostGraduationUniversity": "iim",
        "empPrimaryCapability": [
          "Communication"
        ],
        "empSkillSet": [
          "Communication skill"
        ],
        "empCertifications": [
          "Power Bi"
        ],
        "role": "employee",
        "personalDetails": [],
        "professionalDetails": [],
        "skillsDetails": []
      },
      "createdAt": "2021-12-07T10:52:23.199Z",
      "updatedAt": "2021-12-07T10:52:23.199Z",
      "__v": 0
              }
            ]
          },
          "error": {}
        }
      }
  */
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      code = 500;
      message = "Review not found by given id";
      const resData = customResponse({
        code,
        message,
        err: error,
      });
      return res.status(code).send(resData);
    }

    res.status(200).json({
      status: "success",
      data: {
        review,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.createReview = async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};

exports.updateReview = async (req, res) => {
  /* 
      #swagger.tags = ['Review']
      #swagger.description = 'Update Review' 
       #swagger.parameters['id'] = {
       in: 'path',
       type: 'string',
       description: 'Review id which we want to update/edit'
      }
      #swagger.parameters['obj'] = {
        in: 'body',
        schema: {
              $reqId: 5,
              $reqName: "admadsin",
              $reqType: "profile-creation",
              $status: "pending",
              $employeeDetails: {
                  $empName: "alan sajan",
                  $empEmail: "sajan@mail.com",
                  $empDoj: "2021-11-20T00:00:00.000Z",
                  $empDob: "2021-11-20T00:00:00.000Z",
                  $empDepartment: "sales",
                  $empDesignation: "marketing",
                  $empReportingManager: "sunilee",
                  $empConnections: 10,
                  $empHobbies: [
                      "Music",
                      "Dance"
                  ],
                  $empCtc: "23",
                  $empPhoneNumber: "52164",
                  $empPersonalEmail: "div@gmail.com",
                  $empAboutMe: "i'm always cool..!",
                  $empCurrentAddress: "gujrat",
                  $empResidentialAddress: "gujrat",
                  $empBand: "12",
                  $empGraduation: "bba",
                  $empPostGraduation: "mba",
                  $empPrimaryCapability: [
                      "Communication"
                  ],
                  $empSkillSet: [
                      "Communication skill"
                  ],
                  $empCertifications: [
                      "Power Bi"
                  ],
                  $role: "APPROVER",
                  $personalDetails: [],
                  $professionalDetails: [],
                  $skillsDetails: [],
                  $slackMemId: ""
              }
        }
      }
      #swagger.responses[200] = {
        description: 'reviews updated',
        schema: {
        "status": "success",
        "data": {
            
            "reqId": 5,
            "reqName": "admadsin",
            "reqType": "profile-creation",
            "status": "pending",
            "employeeDetails": {
                "empName": "alan sajan",
                "empEmail": "sajan@mail.com",
                "empDoj": "2021-11-20T00:00:00.000Z",
                "empDob": "2021-11-20T00:00:00.000Z",
                "empDepartment": "sales",
                "empDesignation": "marketing",
                "empReportingManager": "sunilee",
                "empConnections": 10,
                "empHobbies": [
                    "Music",
                    "Dance"
                ],
                "empAboutMe": "i'm always cool..!",
                "empCurrentAddress": "gujrat",
                "empResidentialAddress": "gujrat",
                "empBand": "12",
                "empGraduation": "bba",
                "empGraduationUniversity": "",
                "empPostGraduation": "mba",
                "empPostGraduationUniversity": "",
                "empPrimaryCapability": [
                    "Communication"
                ],
                "empSkillSet": [
                    "Communication skill"
                ],
                "empCertifications": [
                    "Power Bi"
                ],
                "role": "APPROVER"
            },
            "createdAt": "2021-12-14T08:37:28.817Z",
            "updatedAt": "2021-12-14T08:39:03.363Z",
            "__v": 0
        },
        "error": {}
        }
      }

      #swagger.responses[400] = {
      description: 'Bad request',
      schema: { 
        "status": "failure",
        "code": 400,
        "message": "Bad request",
        "data":{},
        "error": {}
        }
      }
      #swagger.responses[500] = {
      description: 'Internal Server Error',
      schema: { 
        "status": "failure",
        "code": 400,
        "message": "Internal Server Error",
        "data":{},
        "error": {}
        }
      }
  */
  try {
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
      code = 500;
      message = "review not found by given id";
      const resData = customResponse({
        code,
        message,
        err: error,
      });
      return res.status(code).send(resData);
    }

    res.status(200).json({
      status: "success",
      data: review,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateReviewStatus = async (req, res) => {
  try {
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
      code = 500;
      message = "review not found by given id";
      const resData = customResponse({
        code,
        message,
        err: error,
      });
      return res.status(code).send(resData);
    }

    const employeeData = {
      ...review.employeeDetails._doc,
    };

    // check and create employee
    if (
      review.reqType === "profile-creation" &&
      req.body.status === "accepted"
    ) {
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
        code = 500;
        message = "Employee not found by given id";
        const resData = customResponse({
          code,
          message,
          err: error,
        });
        return res.status(code).send(resData);
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
      const empId = await Employee.findOne({
        empEmail: review.employeeDetails.empEmail,
      }).select("_id");

      const employee = await Employee.findByIdAndUpdate(
        empId,
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
        code = 500;
        message = "review not found by given id";
        const resData = customResponse({
          code,
          message,
          err: error,
        });
        return res.status(code).send(resData);
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
  } catch (err) {
    console.log(err);
  }
};

exports.deleteReview = async (req, res) => {
  /*
    #swagger.tags = ['Review']
    #swagger.description = 'Delete review'
    #swagger.parameters['reqId'] = {
      in: 'path',
      type: 'string',
      description: 'Review which we want to delete'
    }
    #swagger.responses[204] = {
      description: 'Review deleted successfully.',
      schema:{
    "status": "success",
    "code": 204,
    "message": "Deleted",
    "data": {
    },
    "error": {}
}
    }
      #swagger.responses[400] = {
      description: 'Bad request',
      schema: { 
        "status": "failure",
        "code": 400,
        "message": "Bad request",
        "data":{},
        "error": {}
        }
      }
      #swagger.responses[500] = {
      description: 'Internal Server Error',
      schema: { 
        "status": "failure",
        "code": 500,
        "message": "Internal Server Error",
        "data":{},
        "error": {}
        }
      }
  */
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      code = 500;
      message = "Review not found by given id";
      const resData = customResponse({
        code,
        message,
        err: error,
      });
      return res.status(code).send(resData);
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    console.log(err);
  }
};
