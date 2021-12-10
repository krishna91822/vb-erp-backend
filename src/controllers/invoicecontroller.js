const { invoiceSchema } = require("../schema/invoiceschema");
const Invoice = require("../models/invoicemodel");
const { emailContent } = require("../controllers/poEmailController");
const { emailSender } = require("../middleware/POMailNotification");
const { customResponse } = require("../utility/helper");

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
            $invoice_raised: 'ARS436PY',
            $invoice_amount_received: '999999',
            $vb_bank_account: 'SBIN00004567',
            $amount_received_on: 'Fri Aug 01 2014 21:11:54 GMT+0530 (India Standard Time)'
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
            "invoice_raised": 'ARS436PY',
            $invoice_amount_received: '999999',
            $vb_bank_account: 'SBIN00004567',
            $amount_received_on: 'Fri Aug 01 2014 21:11:54 GMT+0530 (India Standard Time)',
            $created_at: 'Fri Aug 01 2014 21:11:54 GMT+0530 (India Standard Time)',
          },
          "error": {}
        }
      }
  */
  try {
    const { error } = invoiceSchema.validate(req.body);

    if (error) {
      res.status(422).send(error);
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
    console.log(error);
    res.status(422).send(error);
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
                "Targetted_Resources": [
                        "NGB"
                ],
                "_id": "61aee1b97af12a205c1a16c5",
                "Client_Name": "Tanmay kesarwani",
                "Project_Name": "valuebound",
                "PO_Number": "GK475f",
                "PO_Amount": 28274
              },
            "client_sponsor": "Tanmay",
            "client_finance_controller": "xyz",
            "invoice_raised": "huirvkhio",
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
                "Targetted_Resources": [
                        "NGB"
                ],
                "_id": "61aee1b97af12a205c1a16c5",
                "Client_Name": "Tanmay kesarwani",
                "Project_Name": "valuebound",
                "PO_Number": "GK475f",
                "PO_Amount": 28274
              },
            "client_sponsor": "Tanmay",
            "client_finance_controller": "xyz",
            "invoice_raised": "huirvkhio",
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
    const data = req.params.data;
    const val = "invoice_raised";
    const val2 = "Client_Name";
    const val3 = "Id";
    const val4 = "Project_Name";

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
      ]);
      const resData = customResponse({ code, data: details });
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
      ])
        .sort(data)
        .collation({ locale: "en" });
      const resData = customResponse({ code, data: details });
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
      ]).collation({ locale: "en" });
      const resData = customResponse({ code, data: details });
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
      ]).collation({ locale: "en" });
      const resData = customResponse({ code, data: details });
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
};
