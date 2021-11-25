const mongoose = require("mongoose");
const schema = mongoose.Schema;

const requestSchema = new schema({
  id: {
    type: String,
    unique: true,
  },
  requesterName: {
    type: String,
    required: true,
  },
  requestType: {
    type: String,
    required: true,
  },
  requestedOn: {
    type: String,
    required: true,
  },
  requestStatus: {
    type: String,
    required: true,
    enum: ["PENDING", "ACCEPTED", "REJECTED"],
  },
  message: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

requestSchema.set("validateBeforeSave", true);
module.exports = new mongoose.model("request", requestSchema, "requests");
