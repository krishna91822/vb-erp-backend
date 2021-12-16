const { number } = require("joi");
const mongoose = require("mongoose");

const compSchema = mongoose.Schema(
  {
    rowNumber: Number,
<<<<<<< HEAD
    legalName: String,
    brandName: { type: String, unique: true },

    domain: String,
    // Need to verify this field
    // baseLocation: String,
=======
    designation: String,
    brandName: { type: String, unique: true },
    clientName: String,
    domain: String,
    baseLocation: String,
>>>>>>> 71f2ffda8f75b5f7c80e13cf28ae91f37b43e83d
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
<<<<<<< HEAD
      area: String,
=======
      city: String,
>>>>>>> 71f2ffda8f75b5f7c80e13cf28ae91f37b43e83d
      landmark: String,
    },
    communicationAddress: {
      addressLine1: String,
      addressLine2: String,
      pincode: String,
      country: String,
      state: String,
      district: String,
<<<<<<< HEAD
      area: String,
=======
      city: String,
>>>>>>> 71f2ffda8f75b5f7c80e13cf28ae91f37b43e83d
      landmark: String,
    },
    contacts: Object,
    status: {
<<<<<<< HEAD
      type: Number,
      default: 1,
=======
      type: String,
      enum: {
        values: [0, 1],
        message: "0 for inactive and 1 for active",
      },
      default: "1",
>>>>>>> 71f2ffda8f75b5f7c80e13cf28ae91f37b43e83d
    },
  },

  {
    timestamps: true,
  }
);
const compModal = mongoose.model("Comp", compSchema);
module.exports = compModal;
