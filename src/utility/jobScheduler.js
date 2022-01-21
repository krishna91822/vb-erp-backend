var cron = require("node-cron");
const Invoice = require("../models/invoicemodel");
const { emailContent } = require("../controllers/poEmailController");
const { emailSender } = require("../middleware/POMailNotification");

const scheduler = () => {
  cron.schedule("0 0 13 * * *", async () => {
    const getDetails = await Invoice.find({ amount_received_on: "" }).populate(
      "PO_Id",
      "Client_Name Project_Name Targetted_Resources PO_Number PO_Amount POSOW_endDate"
    );
    var today = new Date();
    getDetails.map(async (data) => {
      if (data.PO_Id.POSOW_endDate < today) {
        const statusUpdate = await Invoice.updateOne(
          { _id: data._id },
          {
            $set: { Status: "Overdue", updated_at: new Date() },
          }
        );
        const payload = {
          Client_Name: data.PO_Id.Client_Name,
          Project_Name: data.PO_Id.Project_Name,
          PO_Amount: data.PO_Id.PO_Amount,
          Received_Amount: data.invoice_amount_received,
          Created_On: data.created_at.toLocaleDateString(),
        };
        const content = await emailContent("N002", payload);
        emailSender(content);
      }
    });
  });
};

module.exports = { scheduler };
