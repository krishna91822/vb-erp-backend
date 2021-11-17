const requestModel = require("../models/requestModel");

exports.get_all_requests = function (req, res) {
  requestModel.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

exports.create_request = function (req, res) {
  const request = new requestModel();
  request.id = req.body.id;
  request.requesterName = req.body.requesterName;
  request.requestType = req.body.requestType;
  request.requestedOn = req.body.requestedOn;
  request.requestStatus = req.body.requestStatus;
  request.message = req.body.message;
  request.data = req.body.data;

  request.save((err, doc) => {
    if (err) {
      console.log(`err is ${err}`);
      res.status(400).send(`Submit all the required fields`);
    } else {
      res.send(doc);
    }
  });
};
