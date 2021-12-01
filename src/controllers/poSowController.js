const purchaseOrderModel = require("../models/poSow");
const { poSowSchema } = require("../schema/poSowSchema");
const { customResponse } = require("../utility/helper");

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
        $set: { ...req.body },
      }
    );
    code = 200;
    message = "data updated successfully";
    const resData = customResponse({
      code,
      data: updateDetails,
      message,
    });
    res.status(code).json(resData);
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

module.exports = { createPoSow, updatePODetais };
