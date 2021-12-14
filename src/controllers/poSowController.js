const purchaseOrderModel = require("../models/poSow");
const { poSowSchema, querySchema } = require("../schema/poSowSchema");
const  projectsSchema = require("../models/projectsModel")
const { customResponse, customPagination } = require("../utility/helper");

const createPoSow = async (req, res) => {
  /* 	#swagger.tags = ['PO/SOW']
      #swagger.description = 'Create new PO/SOW'
      #swagger.parameters['obj'] = {
        in: 'body',
        schema: {
            $Client_Name:'Valuebound Solutions',
            $Project_Name: 'ERP System',
            $Client_Sponser: ['ABD','DEF'],
            $Client_Finance_Controller: ['VMN','QWE'],
            $Targetted_Resources: ['WSJ','GHJ'],
            $Status: 'Drafted',
            $Type: 'PO',
            $PO_Number: 'ERP34',
            $PO_Amount: 3434,
            $Currency: 'USD',
            $Document_Name: 'VB_ERP',
            $Document_Type: 'pdf',
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
            "Client_Name":'Valuebound Solutions',
            "Project_Name": 'ERP System',
            "Client_Sponser": ['ABD','DEF'],
            "Client_Finance_Controller": ['VMN','QWE'],
            "Targetted_Resources": ['WSJ','GHJ'],
            "Status": 'Drafted',
            "Type": 'PO',
            "PO_Number": 'ERP34',
            "PO_Amount": 3434,
            "Currency": 'USD',
            "Document_Name": 'VB_ERP',
            "Document_Type": 'pdf',
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
    const poSow = await new purchaseOrderModel(req.body).save();
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
                "Client_Name": "Valuebound Solutions",
                "Project_Name": "ERP System",
                "Client_Sponser": ["ABD","DEF"],
                "Client_Finance_Controller": ["VMN","QWE"],
                "Targetted_Resources": ["WSJ","GHJ"],
                "Status": "Drafted",
                "Type": "PO",
                "PO_Number": "ERP34",
                "PO_Amount": 3434,
                "Currency": "USD",
                "Document_Name": "VB_ERP",
                "Document_Type": "pdf",
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
      console.log(error);
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
    const users = await purchaseOrderModel.find(query).sort(fieldName);
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
            "Client_Name": "Valuebound Solutions",
            "Project_Name": "ERP System",
            "Client_Sponser": ["ABD","DEF"],
            "Client_Finance_Controller": ["VMN","QWE"],
            "Targetted_Resources": ["WSJ","GHJ"],
            "Status": "Drafted",
            "Type": "PO",
            "PO_Number": "ERP34",
            "PO_Amount": 3434,
            "Currency": "USD",
            "Document_Name": "VB_ERP",
            "Document_Type": "pdf",
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
              $Client_Name:'Valuebound Solutions',
              $Project_Name: 'ERP System',
              $Client_Sponser: ['ABD','DEF'],
              $Client_Finance_Controller: ['VMN','QWE'],
              $Targetted_Resources: ['WSJ','GHJ'],
              $Status: 'Drafted',
              $Type: 'PO',
              $PO_Number: 'ERP34',
              $PO_Amount: 3434,
              $Currency: 'USD',
              $Document_Name: 'VB_ERP',
              $Document_Type: 'pdf',
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
            "Client_Name":'Valuebound Solutions',
              "Project_Name": 'ERP System Backend',
              "Client_Sponser": ['ABD','DEF'],
              "Client_Finance_Controller": ['VMN','QWE'],
              "Targetted_Resources": ['WSJ','GHJ'],
              "Status": 'Drafted',
              "Type": 'PO',
              "PO_Number": 'ERP43',
              "PO_Amount": 3434,
              "Currency": 'INR',
              "Document_Name": 'VB_ERP',
              "Document_Type": 'pdf',
              "POSOW_endDate": "2014-01-22T14:56:59.301Z",
              "Remarks": 'Created New PO'
          },
          "error": {}
        }
      }
  */
  let code, message;
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
    const updateDetails = await purchaseOrderModel.updateOne(
      { _id: req.params.id },
      {
        $set: { ...req.body, Updated_At: new Date() },
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

const updatePOStatus = async (req, res) => {
  /* 	#swagger.tags = ['PO/SOW'']
      #swagger.description = 'Update PO/SOW details' 
      #swagger.responses[200] = {
        description: 'PO/SOW details updated successfully.',
        schema: { 
          "status": "success",
          "code": 200,
          "message": "",
          "data": {
            "Client_Name":'Valuebound Solutions',
              "Project_Name": 'ERP System Backend',
              "Client_Sponser": ['ABD','DEF'],
              "Client_Finance_Controller": ['VMN','QWE'],
              "Targetted_Resources": ['WSJ','GHJ'],
              "Status": 'Pending',
              "Type": 'PO',
              "PO_Number": 'ERP43',
              "PO_Amount": 3434,
              "Currency": 'INR',
              "Document_Name": 'VB_ERP',
              "Document_Type": 'pdf',
              "POSOW_endDate": "2014-01-22T14:56:59.301Z",
              "Remarks": 'Created New PO'
          },
          "error": {}
        }
      }
  */
  let code, message;
  try {
    const _id = req.params.id;
    const getDetails = await purchaseOrderModel.findById({ _id });

    const { Status } = getDetails;
    const status2 = "drafted";
    const newStatus = "Pending";
    if (Status.toLowerCase() === status2) {
      code = 200;
      message = "status updated successfully";
      const updateStatus = await purchaseOrderModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            Status: newStatus,
            Updated_At: new Date(),
          },
        }
      );
      const resData = customResponse({
        code,
        data: updateStatus,
        message,
      });
      return res.status(code).send(resData);
    } else {
      code = 400;
      message = "status already updated";
      const resData = customResponse({
        code,
        message,
      });
      res.status(code).send(resData);
    }
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

const getClients = async (req,res) => {
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
      { "$group": {
         "_id": "$clientName",
        "Counter": { "$sum": 1 }
     }},
     { "$match": {
       "Counter": { "$gte": 1 },
     }},
     {"$project": {"clientName" : "$_id", "_id" : 0} }
 ])
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
   
}

const getProjects = async (req,res) => {
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
      {clientName: req.params.clientName},
      {projectName: 1}
      ) 
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
   
}


module.exports = {
  createPoSow,
  getPoDeatil,
  getSortedPoList,
  updatePOStatus,
  updatePODetais,
  getClients,
  getProjects
};
