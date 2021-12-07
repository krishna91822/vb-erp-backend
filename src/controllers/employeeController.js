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
  const limit = 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;
    let code,message;
    try {
        code=200;
    employees = await employeesModal.find({});
    const data=customPagination({data:employees,page:page,limit:limit});
    const resData=customResponse({code,data})
    res.status(code).send(resData);
    
  } catch (error) {
    code=500;
    message="Internal Server error"
    res.status(code).send(error.message);
  }
};

const searchEmployees = async(req, res) => {
let code,message;
const limit = 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const searchName= req.query;
try{
  if(Object.keys(req.query).length===0){
    const employees =await employeesModal.find({});
  code=200;
  const data=customPagination({data:employees,page:page,limit:limit});
  const resData=customResponse({code,data})
  res.status(code).send(resData);  
  }
   else{  
  const employees = await employeesModal.find({$or:[{empName: {$regex:searchName.search.trim(), $options: 'i'}},
                                               {empEmail: {$regex:searchName.search.trim(), $options: 'i'}}]});
    if(employees.length<1) {
      code=400;
      message="Bad Request, No rewards found"
      const resdata=customResponse({code,message})
        return res.status(code).send(resdata);
    }
        code=200;
        const data=customPagination({data:employees,page:page,limit:limit});
    const resData=customResponse({code,data})
     return res.status(code).send(resData);  
  }  
  }
catch (error){
    code=500;
    message="Internal Server Error"
    const resdata=customResponse({code,message,err:error});
    res.status(code).send(resdata);
  }
};
module.exports ={
    getEmployees,
    storeEmployee,
    searchEmployees
}