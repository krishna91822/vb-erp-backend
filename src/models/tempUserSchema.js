const mongoose = require("mongoose");

const tempUserSchema = mongoose.Schema(
  {
    name: String,
    roles: Array,
    email: String,
    password: String,
  }
);
const tempUserModal = mongoose.model("tempUser", tempUserSchema);
module.exports = tempUserModal;
