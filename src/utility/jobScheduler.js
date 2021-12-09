var cron = require("node-cron")
const Invoice = require("../models/invoicemodel");
const {emailContent} = require("../controllers/poEmailController")
const {emailSender} = require("../middleware/POMailNotification")

const scheduler = () =>{
    cron.schedule("0 0 13 * * *",async ()=>{
        const getDetails = await Invoice.find({amount_received_on:""}).populate(
            "PO_Id",
            "Client_Name Project_Name Targetted_Resources PO_Number PO_Amount"
          );
          var today = new Date();
          getDetails.map(async (data)=>{
           var createdDate = data.created_at.getTime();
           var currentDate = today.getTime();
           var dateDifference = parseInt((currentDate-createdDate)/(24*3600*1000));
           if(dateDifference == 45){
               const payload = {
                Client_Name: data.PO_Id.Client_Name,
                Project_Name: data.PO_Id.Project_Name,
                PO_Amount: data.PO_Id.PO_Amount,
                Received_Amount: data.invoice_amount_received,
                Created_On : data.created_at.toLocaleDateString() 
               }
               const content = await emailContent("N002",payload)
              emailSender(content)
           }
          });
    });
}

module.exports = {scheduler}