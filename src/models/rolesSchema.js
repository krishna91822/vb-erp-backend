const mongoose = require("mongoose");

const rolesSchema = mongoose.Schema(
  {
    label: String,
    permission: Array,
  },
  {
    timestamps: true,
  }
);
const rolesModal = mongoose.model("roles", rolesSchema);
module.exports = rolesModal;
