const tempUserModal = require("../models/tempUserSchema");
const { customResponse } = require("../utility/helper");

//Get all records in database
const getUsers = async (req, res) => {
  const username = req.query.username || "";
  const pass = req.query.pass || "";

  const searchQuery = { name: username };

  try {
    const data = await tempUserModal.find(searchQuery);

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
