const mongoose = require("mongoose");

const compSchema = mongoose.Schema({
    designation: String,
    brandname: String,
    clientname: String,
    domain: String,
    baselocation: String,
    addressLine1: String,
    addressLine2: String,
    pincode: Number,
    country: String,
    state: String,
    district: String,
    city: String,
    landmark: String,
    contacts: Object,
},
    {
        timestamps: true,
    }

);
const compModal = mongoose.model("Comp", compSchema);
module.exports = compModal;