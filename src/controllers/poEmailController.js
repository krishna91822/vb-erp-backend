const templateModel = require("../models/emailtemplate");
const Mustache = require("mustache");

const emailContent = async (tempId, data) => {
  const getTemplate = await templateModel.findOne({ temp_Id: tempId });
  const subject = Mustache.render(getTemplate.subject, data);
  const body = Mustache.render(getTemplate.body, data);
  return (content = { subject, body, to: getTemplate.to });
};

const emailTemplate = async (tempID, data) => {
  const template = await templateModel.findOne({ temp_Id: tempID });
  const subject = Mustache.render(template.subject, data);
  const body = Mustache.render(template.body, data);
  return (content = { subject, body, to: template.to });
};

module.exports = { emailContent, emailTemplate };
