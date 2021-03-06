const purchaseOrderModel = require("../models/poSow");
const { poSowSchema, querySchema } = require("../schema/poSowSchema");
const projectsSchema = require("../models/projectsModel");
const projectEmployeeModel = require("../models/projectEmployeeModel");
const Employee = require("../models/employeeModel");
const Invoice = require("../models/invoicemodel");
const { emailContent } = require("../controllers/poEmailController");
const { emailSender } = require("../middleware/POMailNotification");
const StatusLifeCycle = require("../utility/constant");
const { customResponse, customPagination } = require("../utility/helper");

const createPoSow = async (req, res) => {
  /* 	#swagger.tags = ['PO/SOW']
      #swagger.description = 'Create new PO/SOW'
      #swagger.parameters['obj'] = {
        in: 'body',
        schema: {
            $Project_Id: '61bb0622bf6c0b45dff12f77',
            $Client_Name:'Valuebound Solutions',
            $Project_Name: 'ERP System',
            $Client_Sponser: 'Jai',
            $Client_Finance_Controller: 'Tanmay',
            $Targetted_Resources: {"Suresh":"true","Akash":"false"},
            $Targeted_Res_AllocationRate: {"ABC":50,"DCH":60},
            $Type: 'PO',
            $PO_Amount: 3434,
            $Currency: 'USD',
            $Document_Name: 'VB_ERP',
            $POSOW_endDate: "2014-01-22T14:56:59.301Z",
            $Remarks: 'Created New PO'
        }
      }
      #swagger.responses[201] = {
        description: 'User successfully added.',
        schema: { 
          "status": "success",
          "code": 201,
          "message": "",
          "data": {
            "Project_Id": '61bb0622bf6c0b45dff12f77',
            "Client_Name":'Valuebound Solutions',
            "Project_Name": 'ERP System',
            "Client_Sponser": 'Jai',
            "Client_Finance_Controller": 'Tanmay',
            "Targetted_Resources": {"ABC":"true","DCH":"false"},
            "Targeted_Res_AllocationRate": {"ABC":50,"DCH":60},
            "Type": 'PO',
            "PO_Number": 'ERP34',
            "PO_Amount": 3434,
            "Currency": 'USD',
            "Document_Name": 'VB_ERP',
            "POSOW_endDate": "2014-01-22T14:56:59.301Z",
            "Remarks": 'Created New PO',
            "Created_At": "2021-12-10T06:01:50.178Z",
            "__v": 0
          },
          "error": {}
        }
      }
  */
  try {
    const { error } = poSowSchema.validate(req.body);
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
    const st = req.body.Type;
    let counter;
    let po = "PO";
    let sow = "SOW";
    let num;

    if (st.toLowerCase() === "po") {
      counter = await purchaseOrderModel.countDocuments({ Type: "PO" });
      counter = counter + 1;
      const genarateID = generateId(counter, po);
      num = genarateID;
    } else {
      counter = await purchaseOrderModel.countDocuments({ Type: "SOW" });
      counter = counter + 1;
      const genarateID = generateId(counter, sow);
      num = genarateID;
    }
    const poSow = await new purchaseOrderModel({
      ...req.body,
      PO_Number: num,
    }).save();

    const invoices = new Invoice({
      PO_Id: poSow._id,
      client_sponsor: poSow.Client_Sponser,
      client_finance_controller: poSow.Client_Finance_Controller,
    });
    const invoice = await invoices.save();

    const getDetails = await Invoice.findOne({ _id: invoice._id }).populate(
      "PO_Id",
      "Client_Name Project_Name Targetted_Resources PO_Number PO_Amount Currency"
    );

    const data = {
      Client_Name: getDetails.PO_Id.Client_Name,
      Project_Name: getDetails.PO_Id.Project_Name,
      PO_Amount: getDetails.PO_Id.PO_Amount,
      Received_Amount: getDetails.invoice_amount_received,
    };
    const content = await emailContent("N001", data);
    emailSender(content);

    res.status(200).send(poSow);
  } catch (error) {
    res.status(401).send(error);
  }
};

const getSortedPoList = async (req, res) => {
  /* 	#swagger.tags = ['PO/SOW']
      #swagger.description = 'Get PO/SOW list' 
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
                "Project_Id": '61bb0622bf6c0b45dff12f77',
                "Client_Name": "Valuebound Solutions",
                "Project_Name": "ERP System",
                "Client_Sponser": 'Jai',
                "Client_Finance_Controller": 'Tanmay',
                "Targetted_Resources": {"ABC":"true","DCH":"false"},
                "Targeted_Res_AllocationRate": {"ABC":50,"DCH":60},
                "Type": "PO",
                "PO_Number": "ERP34",
                "PO_Amount": 3434,
                "Currency": "USD",
                "Document_Name": "VB_ERP",
                "POSOW_endDate": "2014-01-22T14:56:59.301Z",
                "Remarks": "Created New PO",
                "__v": 0,
                "Created_At": "2021-12-10T05:55:17.961Z"
              }
            ]
          },
          "error": {}
        } 
      }
  */
  let code, message;

  const fieldName = req.params.fieldName;
  try {
    const { error } = querySchema.validate(req.query);
    if (error) {
      code = 422;
      message = "Invalid request Query";
      const resData = customResponse({
        code,
        message,
        err: error && error.details,
      });
      return res.status(code).send(resData);
    }
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 15;
    code = 200;
    let query = {};
    if (req.query.keyword) {
      query.$or = [
        { Client_Name: { $regex: req.query.keyword, $options: "i" } },
        { Project_Name: { $regex: req.query.keyword, $options: "i" } },
      ];
    }
    if (fieldName === "Id") {
      const users = await purchaseOrderModel.find(query);
      const data = customPagination({ data: users, page, limit });
      const resData = customResponse({ code, data });
      return res.status(code).send(resData);
    }
    const users = await purchaseOrderModel
      .find(query)
      .sort(fieldName)
      .collation({ locale: "en" });
    const data = customPagination({ data: users, page, limit });
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

const getPoDeatil = async (req, res) => {
  /* 	#swagger.tags = ['PO/SOW']
      #swagger.description = 'Get PO/SOW Detail' 
      #swagger.responses[200] = {
        schema:{
          "status": "success",
          "code": 200,
          "message": "",
          "data":  {
            "_id": "61a49363c343b8220cff6c08",
            "Project_Id": '61bb0622bf6c0b45dff12f77',
            "Client_Name": "Valuebound Solutions",
            "Project_Name": "ERP System",
            "Client_Sponser": 'Jai',
            "Client_Finance_Controller": 'Tanmay',
            "Targetted_Resources": {"ABC":"true","DCH":"false"},
            "Targeted_Res_AllocationRate": {"ABC":50,"DCH":60},
            "Type": "PO",
            "PO_Number": "ERP34",
            "PO_Amount": 3434,
            "Currency": "USD",
            "Document_Name": "VB_ERP",
            "POSOW_endDate": "2014-01-22T14:56:59.301Z",
            "Remarks": "Created New PO",
            "__v": 0,
            "Created_At": "2021-12-10T05:55:17.961Z"
          },
          "error": {}
        }
      }
  */
  let code, message;
  const _id = req.params.id;
  try {
    code = 200;
    const data = await purchaseOrderModel.findById({ _id });
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

const updatePODetais = async (req, res) => {
  /* 	#swagger.tags = ['PO/SOW'']
      #swagger.description = 'Update PO/SOW details' 
      #swagger.parameters['obj'] = {
        in: 'body',
        schema: {
              $Project_Id: '61bb0622bf6c0b45dff12f77',
              $Client_Name:'Valuebound Solutions',
              $Project_Name: 'ERP System',
              $Client_Sponser: 'Jai',
              $Client_Finance_Controller: 'Tanmay',
              $Targetted_Resources: {"ABC":"true","DCH":"false"},
              $Targeted_Res_AllocationRate: {"ABC":50,"DCH":60},
              $Type: 'PO',
              $PO_Amount: 3434,
              $Currency: 'USD',
              $Document_Name: 'VB_ERP',
              $POSOW_endDate: "2014-01-22T14:56:59.301Z",
              $Remarks: 'Created New PO'
        }
      }
      #swagger.responses[200] = {
        description: 'PO/SOW details updated successfully.',
        schema: { 
          "status": "success",
          "code": 200,
          "message": "",
          "data": {
              "Project_Id": '61bb0622bf6c0b45dff12f77',
              "Client_Name":'Valuebound Solutions',
              "Project_Name": 'ERP System Backend',
              "Client_Sponser": 'Jai',
              "Client_Finance_Controller": 'Tanmay',
              "Targetted_Resources": {"ABC":"true","DCH":"false"},
              "Targeted_Res_AllocationRate": {"ABC":50,"DCH":60},
              "Type": 'PO',
              "PO_Number": 'ERP43',
              "PO_Amount": 3434,
              "Currency": 'INR',
              "Document_Name": 'VB_ERP',
              "POSOW_endDate": "2014-01-22T14:56:59.301Z",
              "Remarks": 'Created New PO'
          },
          "error": {}
        }
      }
  */
  let code,
    message,
    updateStatus = "Draft";
  const currDate = new Date();
  try {
    const { error } = poSowSchema.validate(req.body);
    if (error) {
      code = 422;
      message = "Invalid update data";
      const resData = customResponse({
        code,
        message,
        err: error && error.details,
      });
      return res.status(code).send(resData);
    }
    const updateDetails = await purchaseOrderModel.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body, Updated_At: new Date() },
      { new: true }
    );
    await updateDetails.save();

    const getDetails = await Invoice.findOne({
      PO_Id: req.params.id,
    });

    if (updateDetails.POSOW_endDate < currDate) {
      updateStatus = "Overdue";
    } else if (
      updateDetails.POSOW_endDate >= currDate &&
      getDetails.invoice_raised === "Yes" &&
      getDetails.invoice_received === "Yes"
    ) {
      updateStatus = "Complete";
    } else if (
      updateDetails.POSOW_endDate >= currDate &&
      getDetails.invoice_raised === "Yes"
    ) {
      updateStatus = "Invoice raised";
    }

    await Invoice.updateOne(
      { _id: getDetails._id },
      {
        $set: { Status: updateStatus, updated_at: new Date() },
      }
    );

    code = 200;
    message = "data updated successfully";
    const resData = customResponse({
      code,
      data: updateDetails,
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

const getClients = async (req, res) => {
  /* 	#swagger.tags = ['PO/SOW']
      #swagger.description = 'Get Client list' 
      #swagger.responses[200] = {
        schema:{
         "status": "success",
         "code": 200,
         "message": "",
         "data": [
             {
               "clientName": "Valuebound"
             },
             {
               "clientName": "Nasdaq"
             }
           ],
         "error": {}
       }
      }
  */

  let code, message;
  try {
    const data = await projectsSchema.aggregate([
      {
        $group: {
          _id: "$clientName",
          Counter: { $sum: 1 },
        },
      },
      {
        $match: {
          Counter: { $gte: 1 },
        },
      },
      { $project: { clientName: "$_id", _id: 0 } },
    ]);
    code = 200;
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

const getProjects = async (req, res) => {
  /* 	#swagger.tags = ['PO/SOW']
      #swagger.description = 'Get Project list of a Client' 
      #swagger.responses[200] = {
        schema:{
         "status": "success",
         "code": 200,
         "message": "",
         "data": [
           {
             "_id": "61b857d0b08340b2ddad1341",
             "projectName": "Employee Management"
           }
         ],
         "error": {}
       }
      }
  */

  let code, message;
  try {
    const data = await projectsSchema.find(
      { clientName: req.params.clientName },
      { projectName: 1 }
    );
    code = 200;
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

const getDetails = async (req, res) => {
  /* 	#swagger.tags = ['PO/SOW']
      #swagger.description = 'Get project details of given Id' 
      #swagger.parameters['projectId'] = {
        in: 'query',
        type: 'string',
        description: 'Project ID' 
      }
      #swagger.responses[200] = {
        schema:{
          "status": "success",
          "code": 200,
          "message": "",
          "data": [
           {
             "empPrimaryCapiblities": [],
             "_id": "61b8c18ce56e27b307b73168",
             "projectId": {
                "_id": "61b8c18ce56e27b307b73166",
                "vbProjectId": "VB-PROJ-1",
                "projectName": "Valuebound",
                "clientProjectSponsor": "Jai K",
                "clientFinanceController": "Jai K"
             },
             "primaryCapiblities": [],
             "allocationStartDate": "2021-12-14",
             "allocationEndDate": "2021-12-17",
             "allocationPercentage": 57,
             "rackRate": 45132,
             "__v": 0,
             "empId": {
                "_id": "61b59800430ab0392fd92640",
                "empId": 15,
                "empName": "sanjay"
             }
           }
          ],
         "error": {}
        } 
      }
  */

  const query = req.query.projectId;
  let code;
  try {
    const data = await projectEmployeeModel
      .find({ projectId: query })
      .populate({
        path: "empId",
        model: "Employee",
        select: "_id empId empName",
      })
      .populate(
        "projectId",
        "_id vbProjectId projectName clientProjectSponsor clientFinanceController"
      );
    code = 200;
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

function generateId(counter, posow) {
  if (counter < 10) {
    posow += "000";
  } else if (counter < 100) {
    posow += "00";
  } else if (counter < 1000) {
    posow += "0";
  }
  return posow + counter;
}

module.exports = {
  createPoSow,
  getPoDeatil,
  getSortedPoList,
  updatePODetais,
  getClients,
  getProjects,
  getDetails,
};
