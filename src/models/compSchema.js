const { number } = require("joi");
const mongoose = require("mongoose");

const compSchema = mongoose.Schema(
  {
    rowNumber: Number,
    legalName: String,
    brandName: { type: String, unique: true },

    domain: String,
    baseLocation: String,
    gstNumber: String,
    panNumber: String,
    companyType: String,

    registeredAddress: {
      addressLine1: String,
      addressLine2: String,
      pincode: String,
      country: String,
      state: String,
      district: String,
      area: String,
      landmark: String,
    },
    communicationAddress: {
      addressLine1: String,
      addressLine2: String,
      pincode: String,
      country: String,
      state: String,
      district: String,
      area: String,
      landmark: String,
    },
    contacts: Object,
    status: {
      type: Number,
      default: 1,
    },
  },

  {
    timestamps: true,
  }
);
const compModal = mongoose.model("Comp", compSchema);
module.exports = compModal;
