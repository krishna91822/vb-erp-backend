const ReviewSchema = require("../models/ReviewModel");
const employeeModel = require("../models/employeeModel");

const get_reviews = async (req, res) => {
  try {
    let result = await ReviewSchema.find({});
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

const get_Id_review = async (req, res) => {
  try {
    let result = await employeeModel.find({empId: req.params});
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

const get_status = async (req, res) =>{
  req.body.ReqId ? try { const {ReqId} = req.ReqId
  res.send()
    
  } catch (error) {
    
  } : try {
    
  } catch (error) {
    
  }
}

module.exports = { get_reviews, get_Id_review };
