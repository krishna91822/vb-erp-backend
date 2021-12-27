const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema({
  university: {
    type: String,
    required: true,
    unique: true,
  },
});

const universityModel = mongoose.model("colleges", universitySchema);
module.exports = { universityModel };
