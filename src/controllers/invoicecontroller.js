//const { invoiceschema } = require("../schema/invoiceschema");
const Invoice = require("../models/invoicemodel");

const newInvoice = async (req, res) => {
  try {
    // console.log("checking valiation")
    // const { error } = invoiceschema.validate(req.body);

    // if (error) {
    //   res.status(422).send(error);
    // }

    const invoice = await Invoice.create(req.body);
    res.status(201).json({
      status: true,
      invoice,
    });
  } catch (error) {
    res.status(422).send(error);
  }
};

// const all_invoice = async (req, res) => {
//   let invoices;
//   try {
//     invoices = await Invoice.find({}).populate('userid','Client_Name Project_Name Targetted_Resources PO_Number PO_Amount');
//     res.status(200).json({
//       status: true,
//       invoices
//     })
//   } catch (error) {
//     res.status(401).send(error);
//   }
// }

const getInvoices = async (req, res) => {
  try {
    const getDetails = await Invoice.find({}).populate(
      "userid",
      "Client_Name Project_Name Targetted_Resources PO_Number PO_Amount"
    );
    res.status(200).json(getDetails);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
const getInvoiceDetailsById = async (req, res) => {
  try {
    const getDetails = await Invoice.findById(req.params.id).populate(
      "userid",
      "Client_Name Project_Name Targetted_Resources PO_Number PO_Amount"
    );
    res.status(200).json(getDetails);
  } catch (error) {
    res.status(400).send(error);
  }
};
const getInvoiceDetails = async (req, res) => {
  try {
    const data = req.params.data;
    const val = "Client_Sponser";
    const val2 = "Client_Name";
    if (data === val) {
      const details = await Invoice.find({})
        .populate(
          "userid",
          "Client_Name Project_Name Targetted_Resources PO_Number PO_Amount"
        )
        .collation({ locale: "en" })
        .sort(data);
      res.status(200).json(details);
    } else if (data === val2) {
      const details = await Invoice.aggregate([
        {
          $lookup: {
            from: "purchase_orders",
            localField: "userid",
            foreignField: "_id",
            as: "purchase_orders",
          },
        },
        { $unwind: "$purchase_orders" },
        { $sort: { "purchase_orders.Client_Name": 1 } },
      ]).collation({ locale: "en" });
      res.status(200).json(details);
    } else {
      const details = await Invoice.aggregate([
        {
          $lookup: {
            from: "purchase_orders",
            localField: "userid",
            foreignField: "_id",
            as: "purchase_orders",
          },
        },
        { $unwind: "$purchase_orders" },
        { $sort: { "purchase_orders.Project_Name": 1 } },
      ]).collation({ locale: "en" });
      res.status(200).json(details);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  newInvoice,
  getInvoices,
  getInvoiceDetailsById,
  getInvoiceDetails,
};

// const update_invoice = async (req, res) => {
//   let invoice = await Invoice.findById(req.params.id);

//   if (!invoice) {
//     return res.status(500).json({
//       success: false,
//       message: "Invoice not found"
//     })
//   }

//   invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//     useFindandModify: false
//   });

//   res.status(200).json({
//     status: true,
//     invoice
//   })
// }

// const delete_invoice = async (req, res) => {
//   const invoice = await Invoice.findById(req.params.id);

//   if (!invoice) {
//     return res.status(500).json({
//       status: false,
//       message: "Invoice not found"
//     })
//   }

//   await invoice.remove();

//   res.status(200).json({
//     success: true,
//     message: "Invoice deleted"
//   })

// }
