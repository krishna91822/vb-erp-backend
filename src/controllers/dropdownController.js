const { Dropdown } = require("../models/dropdownModel");
const APIFeatures = require("../utility/apiFeatures");
const { customResponse } = require("../utility/helper");
const mongoose = require("mongoose");

exports.getAllDropdowns = async (req, res) => {
  let code, message;
  try {
    //Build the query
    const features = new APIFeatures(Dropdown.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    //Execute the query
    const dropdowns = await features.query;
    const countDoc = await Dropdown.count({});

    code = 200;
    message = "success";
    let data = dropdowns;
    let totalDocuments = countDoc;
    let totalResult = dropdowns.length;
    const resData = customResponse({
      code,
      message,
      data,
      totalDocuments,
      totalResult,
    });
    return res.status(code).send(resData);
  } catch (error) {
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

exports.getDropdown = async (req, res) => {
  let code, message;
  try {
    const dropdown = await Dropdown.findById(req.params.id);

    if (!dropdown) {
      code = 500;
      message = "dropdown not found by given id";
      const resData = customResponse({
        code,
        message,
        err: error,
      });
      return res.status(code).send(resData);
    }

    code = 200;
    message = "success";
    let data = dropdown;
    const resData = customResponse({ code, message, data });
    return res.status(code).send(resData);
  } catch (error) {
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

exports.createDropdown = async (req, res) => {
  let code, message;
  try {
    const newDropdown = await Dropdown.create(req.body);

    let code = 201;
    let message = "success";
    let data = newDropdown;
    const resData = customResponse({ code, message, data });
    return res.status(code).send(resData);
  } catch (error) {
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

exports.updateDropdown = async (req, res) => {
  let code, message;
  try {
    const dropdown = await Dropdown.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!dropdown) {
      code = 500;
      message = "Update dropdown by id failed";
      const resData = customResponse({
        code,
        message,
        err: error,
      });
      return res.status(code).send(resData);
    }

    code = 200;
    message = "succcess";
    let data = dropdown;
    const resData = customResponse({ code, message, data });
    return res.status(code).send(resData);
  } catch (error) {
    code = 500;
    message = "Update dropdown by id failed";
    const resData = customResponse({
      code,
      message,
      err: error,
    });
    return res.status(code).send(resData);
  }
};

exports.deleteDropdown = async (req, res) => {
  let code, message;
  try {
    const dropdown = await Dropdown.findByIdAndDelete(req.params.id);
    if (!dropdown) {
      code = 500;
      message = "dropdown delete by id has failed";
      const resData = customResponse({
        code,
        message,
        err: error,
      });
      return res.status(code).send(resData);
    }

    code = 204;
    message = "dropdown successfully deleted";
    const resData = customResponse({ code, message });
    return res.status(code).send(resData);
  } catch (error) {
    code = 500;
    message = "dropdown delete by id has failed";
    const resData = customResponse({
      code,
      message,
      err: error,
    });
    return res.status(code).send(resData);
  }
};
