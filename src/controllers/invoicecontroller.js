const { invoiceSchema, querySchema } = require("../schema/invoiceschema");
const Invoice = require("../models/invoicemodel");
const { emailContent } = require("../controllers/poEmailController");
const { emailSender } = require("../middleware/POMailNotification");
const { customResponse, customPagination } = require("../utility/helper");

const newInvoice = async (req, res) => {
  /*
  #swagger.tags = ['invoices']
      #swagger.description = 'Add new invoice'
      #swagger.parameters['obj'] = {
        in: 'body',
        schema: {
            $PO_Id: '61a8bb6ab7dcd452dc0f5e05',
            $client_sponsor: 'AB',
            $client_finance_controller: 'CD',
            $invoice_raised: "Yes",
            $invoice_received: "Yes",
            $invoice_amount_received: 87634788,
            $vb_bank_account: 'SBIN00004567',
            $amount_received_on: '2021-12-10T06:01:50.178Z'
        }
      }
      #swagger.responses[201] = {
        description: 'User successfully added.',
        schema: {
          "status": "success",
          "code": 201,
          "message": "",
          "data": {
            "PO_Id": '61a8bb6ab7dcd452dc0f5e05',
            "client_sponsor": 'AB',
            "client_finance_controller": 'CD',
            "invoice_raised": "Yes",
            "invoice_received": "Yes",
            "invoice_amount_received": 467389738,
            "vb_bank_account": 'SBIN00004567',
            "amount_received_on": '2021-12-10T06:01:50.178Z',
            "created_at": '2021-12-10T06:01:50.178Z',
          },
          "error": {}
        }
      }
  */
  try {
    const { error } = invoiceSchema.validate(req.body);

    if (error) {
      return res.status(422).send(error);
    }

    const invoice = await Invoice.create(req.body);
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

    if (req.body.amount_received_on) {
      const isoDate = getDetails.amount_received_on;
      const date = new Date(isoDate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const dt = date.getDate();
      let curr = getDetails.PO_Id.Currency;
      curr = curr === "INR" ? "Rs." : "$";

      const newDate = dt + "-" + month + "-" + year;
      const data2 = {
        Client_Name: getDetails.PO_Id.Client_Name,
        Project_Name: getDetails.PO_Id.Project_Name,
        PO_Number: getDetails.PO_Id.PO_Number,
        amount_received_on: newDate,
        invoice_raised: getDetails.invoice_raised,
        invoice_amount_received: getDetails.invoice_amount_received,
        Currency: curr,
      };

      const emailTemplate2 = await emailContent("N003", data2);
      emailSender(emailTemplate2);
    }
    res.status(201).json({
      status: true,
      invoice,
    });
  } catch (error) {
    res.status(401).send(error);
  }
};

const getInvoiceDetailsById = async (req, res) => {
  /* 	#swagger.tags = ['invoices']
      #swagger.description = 'Get invoice Detail by id' 
      #swagger.responses[200] = {
        schema:{
          "status": "success",
          "code": 200,
          "message": "",
          "data":  {
            "_id": "610bc1b31b82a66f6bcd64ea",
            "PO_Id": {
                "Targetted_Resources": {"ABC":"true","DCH":"false"},
                "_id": "61aee1b97af12a205c1a16c5",
                "Client_Name": "Tanmay kesarwani",
                "Project_Name": "valuebound",
                "PO_Number": "GK475f",
                "PO_Amount": 28274
              },
            "client_sponsor": "Tanmay",
            "client_finance_controller": "xyz",
            "invoice_raised": 736398,
            "invoice_amount_received": 5689339,
            "vb_bank_account": "dwrjhgcriwog",
            "amount_received_on": "2014-01-22T14:56:59.301Z",
            "__v": 0
          },
          "error": {}
        }
      }
  */
  let code, message;
  try {
    code = 200;
    const getDetails = await Invoice.findById(req.params.id).populate(
      "PO_Id",
      "Client_Name Project_Name Targetted_Resources PO_Number PO_Amount"
    );
    const resData = customResponse({ code, data: getDetails });
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
const getInvoiceDetails = async (req, res) => {
  /* 	#swagger.tags = ['invoices']
      #swagger.description = 'Get sorted Invoice list' 
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
            "results": [
              {
            "_id": "610bc1b31b82a66f6bcd64ea",
            "PO_Id": {
                "Targetted_Resources": {"ABC":"true","DCH":"false"},
                "_id": "61aee1b97af12a205c1a16c5",
                "Client_Name": "Tanmay kesarwani",
                "Project_Name": "valuebound",
                "PO_Number": "GK475f",
                "PO_Amount": 28274
              },
            "client_sponsor": "Tanmay",
            "client_finance_controller": "xyz",
            "invoice_raised": 4738687,
            "invoice_amount_received": 5689339,
            "vb_bank_account": "dwrjhgcriwog",
            "amount_received_on": "2014-01-22T14:56:59.301Z",
            "__v": 0
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

    const data = req.params.data;
    const val = "invoice_amount_received";
    const val2 = "Client_Name";
    const val3 = "Id";
    const val4 = "Project_Name";
    const searchKeyword = req.query.keyword || "";

    if (data === val3) {
      code = 200;
      const details = await Invoice.aggregate([
        {
          $lookup: {
            from: "purchase_orders",
            localField: "PO_Id",
            foreignField: "_id",
            as: "purchase_orders",
          },
        },
        { $unwind: "$purchase_orders" },

        {
          $match: {
            $or: [
              {
                "purchase_orders.Client_Name": {
                  $regex: `${searchKeyword}`,
                  $options: "i",
                },
              },
              {
                "purchase_orders.Project_Name": {
                  $regex: `${searchKeyword}`,
                  $options: "i",
                },
              },
            ],
          },
        },
      ]);

      const data = customPagination({ data: details, page, limit });
      const resData = customResponse({ code, data });
      return res.status(code).send(resData);
    } else if (data === val) {
      code = 200;
      const details = await Invoice.aggregate([
        {
          $lookup: {
            from: "purchase_orders",
            localField: "PO_Id",
            foreignField: "_id",
            as: "purchase_orders",
          },
        },
        { $unwind: "$purchase_orders" },

        {
          $match: {
            $or: [
              {
                "purchase_orders.Client_Name": {
                  $regex: `${searchKeyword}`,
                  $options: "i",
                },
              },
              {
                "purchase_orders.Project_Name": {
                  $regex: `${searchKeyword}`,
                  $options: "i",
                },
              },
            ],
          },
        },
      ]).sort("invoice_amount_received");
      const data = customPagination({ data: details, page, limit });
      const resData = customResponse({ code, data });
      return res.status(code).send(resData);
    } else if (data === val2) {
      code = 200;
      const details = await Invoice.aggregate([
        {
          $lookup: {
            from: "purchase_orders",
            localField: "PO_Id",
            foreignField: "_id",
            as: "purchase_orders",
          },
        },
        { $unwind: "$purchase_orders" },
        { $sort: { "purchase_orders.Client_Name": 1 } },
        {
          $match: {
            $or: [
              {
                "purchase_orders.Client_Name": {
                  $regex: `${searchKeyword}`,
                  $options: "i",
                },
              },
              {
                "purchase_orders.Project_Name": {
                  $regex: `${searchKeyword}`,
                  $options: "i",
                },
              },
            ],
          },
        },
      ]).collation({ locale: "en" });
      const data = customPagination({ data: details, page, limit });
      const resData = customResponse({ code, data });
      return res.status(code).send(resData);
    } else if (data === val4) {
      code = 200;
      const details = await Invoice.aggregate([
        {
          $lookup: {
            from: "purchase_orders",
            localField: "PO_Id",
            foreignField: "_id",
            as: "purchase_orders",
          },
        },
        { $unwind: "$purchase_orders" },
        { $sort: { "purchase_orders.Project_Name": 1 } },
        {
          $match: {
            $or: [
              {
                "purchase_orders.Client_Name": {
                  $regex: `${searchKeyword}`,
                  $options: "i",
                },
              },
              {
                "purchase_orders.Project_Name": {
                  $regex: `${searchKeyword}`,
                  $options: "i",
                },
              },
            ],
          },
        },
      ]).collation({ locale: "en" });
      const data = customPagination({ data: details, page, limit });
      const resData = customResponse({ code, data });
      return res.status(code).send(resData);
    } else {
      code = 400;
      message = "something went wrong!!";
      const resData = customResponse({
        code,
        message,
      });
      return res.status(code).send(resData);
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

const getRelatedInvoices = async (req, res) => {
  const data = req.query.id;
  let code;
  try {
    const details = await Invoice.aggregate([
      {
        $lookup: {
          from: "purchase_orders",
          localField: "PO_Id",
          foreignField: "_id",
          as: "purchase_orders",
        },
      },
      { $unwind: "$purchase_orders" },
      {
        $match: {
          "purchase_orders.Project_Id": data,
        },
      },
    ]);
    code = 200;
    const resData = customResponse({ code, data: details });
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
const updateInvoice = async (req, res) => {
  let code, message;
  try {
    const { error } = invoiceSchema.validate(req.body);
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
    const updateDetails = await Invoice.updateOne(
      { _id: req.params.id },
      {
        $set: { ...req.body, updated_at: new Date() },
      }
    );

    if (req.body.amount_received_on) {
      const getDetails = await Invoice.findOne({ _id: req.params.id }).populate(
        "PO_Id",
        "Client_Name Project_Name Targetted_Resources PO_Number PO_Amount Currency"
      );
      console.log(getDetails);
      const isoDate = getDetails.amount_received_on;
      const date = new Date(isoDate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const dt = date.getDate();
      let curr = getDetails.PO_Id.Currency;
      curr = curr === "INR" ? "Rs." : "$";

      const newDate = dt + "-" + month + "-" + year;
      const data2 = {
        Client_Name: getDetails.PO_Id.Client_Name,
        Project_Name: getDetails.PO_Id.Project_Name,
        PO_Number: getDetails.PO_Id.PO_Number,
        amount_received_on: newDate,
        invoice_raised: getDetails.invoice_raised,
        invoice_amount_received: getDetails.invoice_amount_received,
        Currency: curr,
      };

      const emailTemplate2 = await emailContent("N003", data2);
      emailSender(emailTemplate2);
    }
    code = 200;
    message = "data updated successfully";
    const resData = customResponse({
      code,
      data: updateDetails,
      message,
    });
    return res.status(code).send(resData);
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
  newInvoice,
  getInvoiceDetailsById,
  getInvoiceDetails,
  getRelatedInvoices,
  updateInvoice,
};
