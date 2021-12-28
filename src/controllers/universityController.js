const mongoose = require("mongoose");
const { universityModel } = require("../models/universityModel");
const { customResponse, customPagination } = require("../utility/helper");

const getAllUniversities = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const data = await universityModel.find({});
    const resData = customPagination({ data, page, limit });
    res.send(resData);
  } catch (err) {
    code = 500;
    message = "Internal server error";
    const resData = customResponse({
      code,
      message,
      err: error,
    });
    return res.status(code).send(resData);
  }
};

const searchUniversity = async (req, res) => {
  try {
    const query = "^" + req.query.name;
    const page = req.query.page;
    const limit = req.query.limit;

    const data = await universityModel.find({
      university: { $regex: query, $options: "i" },
    });
    // const resData = customPagination({ data, page, limit });
    let code = 200;
    let message = "success";
    let totalResult = data.length;
    const resData = customResponse({
      code,
      message,
      data,
      totalResult,
    });
    return res.status(code).send(resData);
  } catch (err) {
    code = 500;
    message = "Internal server error";
    const resData = customResponse({
      code,
      message,
      err: error,
    });
    return res.status(code).send(resData);
  }
};

module.exports = { getAllUniversities, searchUniversity };
