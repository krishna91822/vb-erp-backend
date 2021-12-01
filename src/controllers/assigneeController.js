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
        PO_Id:req.body.PO_Id,
        Employee_Id:req.body.Employee_Id,
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


module.exports = {
    createAssignee,
}