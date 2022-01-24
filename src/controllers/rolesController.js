const rolesModal = require("../models/rolesSchema");
const { customResponse } = require("../utility/helper");

//Get all records in database
const getRoles = async (req, res) => {
  try {
    const role = req.query.role || "";
    const data = await rolesModal.find({ label: role });

    code = 200;
    message = "Data fetched successfully";

    const resData = customResponse({
      data,
      code,
      message,
    });

    res.send(resData);
  } catch (error) {
    code = 422;

    const resData = customResponse({
      code,
      error: error && error.details,
    });
    return res.send(resData);
  }
};

const getAllRoles = async (req, res) => {
  try {
    let code, message;
    code = 200;
    const data = await rolesModal.find({}, { label: 1, _id: 0 });
    let roles = [];
    data.map((data) => {
      roles.push(data.label);
    });
    const resdata = customResponse({ code, data: roles });
    res.status(code).send(resdata);
  } catch (error) {
    code = 500;
    message = "Internal Server error";
    const resData = customResponse({ code, message, err: error });
    res.status(code).send(resData);
  }
};
module.exports = {
  getRoles,
  getAllRoles,
};
