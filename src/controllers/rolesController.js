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

module.exports = {
  getRoles,
};
