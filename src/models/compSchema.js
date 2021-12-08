const mongoose = require("mongoose");

const compSchema = mongoose.Schema({
    designation: String,
    brandName: {type: String, unique:true},
    clientName: String,
    domain: String,
    baseLocation: String,
    gstNumber:String,
    panNumber:String,
    companyType:String,
    
    registeredAddress:{
    addressLine1: String,
    addressLine2: String,
    pincode: String,
    country: String,
    state: String,
    district: String,
    city: String,
    landmark: String,
        },
        communicationAddress:{
    addressLine1: String,
    addressLine2: String,
    pincode: String,
    country: String,
    state: String,
    district: String,
    city: String,
    landmark: String,
        },
    contacts: Object,
    status : {
type:Number,
enum:{
    values:[0,1],
    message:"0 for inactive and 1 for active",
},
default:1,
},
},

    {
        timestamps: true,
    }

);
const compModal = mongoose.model("Comp", compSchema);
module.exports = compModal;