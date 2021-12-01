const assigneeModel = require("../models/assignee");
const { assigneeSchema } = require("../schema/assigneeSchema");
const { customResponse, customPagination } = require("../utility/helper");


const createAssignee = async (req, res) => {
  /* 	#swagger.tags = ['Assign Employee']
      #swagger.description = 'Assign new Employee to Project'
      #swagger.parameters['obj'] = {
        in: 'body',
        schema: {
            $PO_Id:'VBERP-34',
            $Employee_Id: 'VBEMP-45',
            $Employee_Name: 'Yusuf Shekh',
            $Allocation_Rate: 70,
            $Start_Date: '04/24/2021',
            $End_Date: '06/12/2021',
        }
      }
      #swagger.responses[201] = {
        description: 'Employee assigned successfully.',
        schema: { 
          "status": "success",
          "code": 201,
          "message": "",
          "data": {
            "PO_Id": 'VBERP-34',
            "Employee_Id": 'VBEMP-45',
            "Employee_Name": "Yusuf Shekh",
            "Status": "assign",
            "Allocation_Rate": 70,
            "Start_Date": "04/24/2021",
            "End_Date": "06/12/2021",
          },
          "error": {}
        }
      }
  */
  try {
    const { error } = assigneeSchema.validate(req.body);
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
    const assignee = await new assigneeModel({
      PO_Id: req.body.PO_Id,
      Employee_Id: req.body.Employee_Id,
      Employee_Name: req.body.Employee_Name,
      Status: "assign",
      Allocation_Rate: req.body.Allocation_Rate,
      Start_Date: req.body.Start_Date,
      End_Date: req.body.End_Date

    }).save();
    res.status(200).send(assignee);
  } catch (error) {
    res.status(401).send(error);
  }
};

const getAssigneeList = async (req, res) => {
  /* 	#swagger.tags = ['Assign Employee']
      #swagger.description = 'Get Assigned Employee list' 
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
          "message": "",
          "data": {
            "pageCount": 1,
            "totalCount": 1,
            "currentPage": 1,
            "results": [
              {
                "_id": "61a49363c343b8220cff6c08",
                "PO_Id": 'VBERP-34',
                "Employee_Id": 'VBEMP-45',
                "Employee_Name": "Yusuf Shekh",
                "Status": "assign",
                "Allocation_Rate": 70,
                "Start_Date": "04/24/2021",
                "End_Date": "06/12/2021",
              }
            ]
          },
          "error": {}
        } 
      }
  */
  let code, message;

  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 15;

  try {
    code = 200;
    const assignee = await assigneeModel.find({ PO_Id: req.params.id });
    const data = customPagination({ data: assignee, page, limit });
    const resData = customResponse({ code, data });
    return res.status(code).send(resData);
  } catch (error) {
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

const updateDetails = async (req, res) => {
  /* 	#swagger.tags = ['Assign Employee']
      #swagger.description = 'Update Employee Details' 
      #swagger.parameters['obj'] = {
        in: 'body',
        schema: {
            $PO_Id:'VBERP-34',
            $Employee_Id: 'VBEMP-45',
            $Employee_Name: 'Yusuf Shekh',
            $Allocation_Rate: 70,
            $Start_Date: '04/24/2021',
            $End_Date: '06/12/2021',
        }
      }
      #swagger.responses[200] = {
        description: 'Details successfully updated.',
        schema: { 
          "status": "success",
          "code": 200,
          "message": "",
          "data": {
            "PO_Id": 'VBERP-34',
            "Employee_Id": 'VBEMP-45',
            "Employee_Name": "Yusuf Shekh",
            "Status": "assign",
            "Allocation_Rate": 70,
            "Start_Date": "04/24/2021",
            "End_Date": "06/12/2021",
          },
          "error": {}
        }
      }
  */
  let code, message;
  const employeeId = req.params.id;
  try {
    const { error } = assigneeSchema.validate(req.body);
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
    code = 200;
    message = "Details successfully updated!";
    const details = await assigneeModel.updateOne(
      { Employee_Id: employeeId },
      {
        $set: {
          Allocation_Rate: req.body.Allocation_Rate,
          Start_Date: req.body.Start_Date,
          End_Date: req.body.End_Date
        }
      }
    )
    const resData = customResponse({
      code,
      data: details,
      message,
    });
    return res.status(code).send(resData);
  } catch (error) {
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

const unassignEmployee = async (req, res) => {
  /* 	#swagger.tags = ['Assign Employee']
      #swagger.description = 'Unassign Employee from Project' 
      #swagger.responses[200] = {
        description: 'Employee unassigned successfully.',
        schema: { 
          "status": "success",
          "code": 200,
          "message": "",
          "data": {
            "PO_Id": 'VBERP-34',
            "Employee_Id": 'VBEMP-45',
            "Employee_Name": "Yusuf Shekh",
            "Status": "unassign",
            "Allocation_Rate": 70,
            "Start_Date": "04/24/2021",
            "End_Date": "06/12/2021",
          },
          "error": {}
        }
      }
  */
  let code, message;
  const employeeId = req.params.id;
  try {
    code = 200;
    message = "Employee successfully unassigned!";
    const details = await assigneeModel.updateOne(
      { Employee_Id: employeeId },
      {
        $set: {
          Status: "unassign",
          End_Date: new Date()
        }
      }
    )
    const resData = customResponse({
      code,
      data: details,
      message,
    });
    return res.status(code).send(resData);
  } catch (error) {
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



module.exports = {
  createAssignee,
  getAssigneeList,
  updateDetails,
  unassignEmployee
}