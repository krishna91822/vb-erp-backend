const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_Mail_Id,
    pass: process.env.SENDER_Mail_Id_Password,
  },
});

const mailOptions = {
  from: process.env.SENDER_Mail_Id, //sender mail id
  to: process.env.CMS_ADMIN_Mail_Id, //CMS Admin mail id
  subject: "hello abc",
  text: `abcdef`,
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log(info.response);
  }
});

module.exports = { transporter };
