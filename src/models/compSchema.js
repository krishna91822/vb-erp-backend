const mongoose = require("mongoose");

const compSchema = mongoose.Schema({
    designation: String,
    brandname: {type: String, unique:true},
    clientname: String,
    domain: String,
    baselocation: String,
    gstnumber:String,
    pannumber:String,
     address:Object,
    contacts: Object,
    status : {
type:String,
enum:{
    values:['0','1'],
    message:"0 for inactive and 1 for active",
},
default:"0",
},
},

    {
        timestamps: true,
    }

);
const compModal = mongoose.model("Comp", compSchema);
module.exports = compModal;