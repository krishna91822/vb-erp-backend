const requestModel = require("../models/requestModel");

async function getAllRequests(req, res) {
  try {
    let result = await requestModel.find({});
    res.send(result);
  } catch (err) {
    console.log(err);
  }
}

async function createRequest(req, res, next) {
  const data = req.body;
  const request = new requestModel(data);

  try {
    let result = await request.save();
    res.status(201).send(result);
  } catch (err) {
    console.log(`err is ${err}`);
    res.status(400).send(`Submit all the required fields in correct format`);
    next(err);
  }
}

module.exports = { getAllRequests, createRequest };
