const mongoose = require("mongoose");

const dropdownField = new mongoose.Schema({
  label: {
    type: String,
    trim: true,
  },
  value: {
    type: String,
    trim: true,
  },
});

const dropdownSchema = new mongoose.Schema(
  {
    dropdownName: {
      type: String,
      required: [true, "A dropdown must have a name"],
      unique: true,
    },
    dropdownArray: {
      type: [dropdownField],
      default: [],
    },
  },
  { timestamps: true }
);

//Employee model class
const Dropdown = mongoose.model("Dropdown", dropdownSchema);

module.exports = { Dropdown };
