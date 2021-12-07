const employeesModal = require("../models/employee");
const { customResponse, customPagination } = require("../utility/helper");

const storeEmployee= async (req, res) => {
    let code,message
     try {
       code = 201;
         const employees = await new employeesModal(req.body);
         employees.save();
         const resdata=customResponse({code,data:employees})
       return res.status(code).send(resdata)
       } catch (error) {
         code = 500;
         message = "Internal server error";
         const resData = customResponse({
           code,
           message,
           err: error,
         });
         return res.status(code).send(resData);
       }
};

const getEmployees = async (req, res) => {
    let code,message
    try {
        code=200;
    employees = await employeesModal.find({});
    const data=customPagination({data:employees});
    const resData=customResponse({code,data})
    res.status(code).send(resData);
    
  } catch (error) {
    code=500;
    message="Internal Server error"
    res.status(code).send(error.message);
  }
};

module.exports ={
    getEmployees,
    storeEmployee
}