const purchaseOrderModel = require("../models/poSow");
const { poSowSchema, querySchema } = require("../schema/poSowSchema");
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
            "Remarks": 'Created New PO'
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

const getPoSowList = async (req, res) => {
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
                "Remarks": "Created New PO"
              }
            ]
          },
          "error": {}
        } 
      }
  */
  let code, message;

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
    const users = await purchaseOrderModel.find({});
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
                "Remarks": "Created New PO"
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
    const users = await purchaseOrderModel.find({}).sort(fieldName);
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
            "Remarks": "Created New PO"
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
        $set: { ...req.body,Updated_At: new Date() },
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
              "Remarks": 'Created New PO'
          },
          "error": {}
        }
      }
  */
  let code, message;
  try {
    const _id = req.params.id;
    console.log(req.params.id);
    const getDetails = await purchaseOrderModel.findById({ _id });
    console.log(getDetails);

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
            Updated_At: new Date()
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



module.exports = {
  createPoSow,
  getPoSowList,
  getPoDeatil,
  getSortedPoList,
  updatePOStatus,
  updatePODetais,
};
