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
  /*
      #swagger.tags = ['Employees']
      #swagger.description = 'Get all employees' 
      #swagger.responses[200] = {
        schema:{
          "status": "success",
          "code": 200,
          "message": "",
          "data": {
            "results": [
              {
                "_id": "610d090636ba149966bd3b55",
                "empName": "Hello"
              }
            ]
          },
          "error": {}
        }
      }
      #swagger.responses[500] = {
      description: 'Internal Server Error',
      schema: { 
        "status": "failure",
        "code": 400,
        "message": "Internal Server Error",
        "data":{},
        "error": {}
        }
      }
  */
    let code,message;
    let query = [
      {
        $match: {
          empName:{ $regex: "" },
        },
      },
    ];
    if (req.query.dob) {
      query.push({
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $dayOfMonth: '$empDob' }, { $dayOfMonth: new Date() }] },
              { $eq: [{ $month: '$empDob' }, { $month: new Date() }] },
            ],
          },
      },
    });
  }
  if (req.query.workAnniversary) {
    query.push({
      $match: {
        $expr: {
          $and: [
            { $eq: [{ $dayOfMonth: '$empDoj' }, { $dayOfMonth: new Date() }] },
            { $eq: [{ $month: '$empDoj' }, { $month: new Date() }] },
          ],
        },
    },
  });
}
const empidSearch=[{
  $project:{
    empId: 1, slack_member_id: 1,_id: 0
  }
}]
if(req.query.empId){
  empidSearch.push({
    $match: {
      empId: parseInt(req.query.empId)
    },
   
  })
}
    try {
        code=200;
        if(!req.query.empId){
    employees = await employeesModal.aggregate(query);
        }
    else{
      employees= await employeesModal.aggregate(empidSearch);
    }
   // const data=customPagination({data:employees});
    const resData=customResponse({code,data:employees})
    res.status(code).send(resData);
    
  } catch (error) {
    code=500;
    message="Internal Server error"
    res.status(code).send(error.message);
  }
};

const searchEmployees = async(req, res) => {
   /* 	
    #swagger.tags = ['Employees']
    #swagger.description = 'Search Employees' 
    #swagger.parameters['search'] = {
      in: 'query',
      type: 'string',
      description: 'Employee name which you want to search' 
    }
    #swagger.responses[200] = {
      schema:{
        "status": "success",
        "code": 200,
        "message": "",
        "data":  {
          "_id": "610bc1b31b82a66f6bcd64ea",
          "empName": "name of employee"  
        },
        "error": {}
      }
    }
    #swagger.responses[400] = {
    description: 'Bad request',
    schema: { 
      "status": "failure",
      "code": 400,
      "message": "Bad request",
      "data":{},
      "error": {}
      }
    }
    #swagger.responses[500] = {
    description: 'Internal Server Error',
    schema: { 
      "status": "failure",
      "code": 400,
      "message": "Internal Server Error",
      "data":{},
      "error": {}
      }
    }
*/
let code,message;
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
       // const data=customPagination({data:employees,page:page,limit:limit});
    const resData=customResponse({code,data:employees})
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