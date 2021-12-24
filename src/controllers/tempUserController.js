const tempUserModal = require("../models/tempUserSchema");
const rolesModal = require("../models/rolesSchema");
const { customResponse } = require("../utility/helper");

//Get all records in database
const getUsers = async (req, res) => {
  const name = req.query.username || "";
  const pass = req.query.pass || "";

  try {
    const userData = await tempUserModal.find({name});

    const role = userData[0].roles[0];
    const rolesData = await rolesModal.find({ label: role });

    const data = {};
    data.name = name;
    data.roles = userData[0].roles;
    data.permissions = rolesData[0].permissions;

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
  getUsers,
};
