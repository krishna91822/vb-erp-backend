const requestModel = require("../models/requestModel");

exports.get_all_requests = async function (req, res) {
  try {
    let result = await requestModel.find({});
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

exports.create_request = async function (req, res) {
  const data = req.body;
  const request = new requestModel(data);

  try {
    let result = await request.save();
    res.send(result);
  } catch (err) {
    console.log(`err is ${err}`);
    res.status(400).send(`Submit all the required fields in correct format`);
  }
};
