const mongoose = require("mongoose");

const tempUserSchema = mongoose.Schema(
  {
    name: String,
    roles: Array,
    // permission: Array,
  },
  {
    timestamps: true,
  }
);
const tempUserModal = mongoose.model("user", tempUserSchema);
module.exports = tempUserModal;
