const mongoose = require("mongoose");

const rolesSchema = mongoose.Schema(
  {
    label: String,
    permissions: Array,
  }
);
const rolesModal = mongoose.model("role", rolesSchema);
module.exports = rolesModal;
