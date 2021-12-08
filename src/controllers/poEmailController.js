const templateModel = require("../models/emailtemplate")
const Mustache = require("mustache")

const emailContent = async (tempId,data) => {
    const getTemplate = await  templateModel.findOne({temp_Id:tempId})
    const subject = Mustache.render(getTemplate.subject,data)
    const body = Mustache.render(getTemplate.body,data)
    return content={subject,body};
}

module.exports = {emailContent};