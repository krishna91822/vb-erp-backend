const EmployeeInfoModel = require("../models/employeeModel");

const storeEmployees = async(req, res) => {
    try {
        const employee = await EmployeeInfoModel(req.body);
        employee.save();
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json(error);
    }
};

const getEmployees = async(req, res) => {
    try {
        const employee = await EmployeeInfoModel.find({});
        res.status(200).send(employee);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Filtering
const getFilterEmployees = async(req, res) => {
    const employeeName = req.query;
    try {
        const filteredEmployee = await EmployeeInfoModel.find({
            'employeeName': { '$regex': `.*${employeeName}*.`, '$options': 'i' }
        });
        res.status(200).send(filteredEmployee);
    } catch (error) {
        res.status(400).send(error);
    }
};


// const getFilterEmployees = async(req, res) => {
//     const searchName = req.query;
//     try {
//         if (Object.keys(req.query).length === 0) {
//             const employee = await EmployeeModalInfo.find({});
//             res.status(200).send(employee);
//         } else {
//             const employee = await EmployeeModalInfo.find({
//                 $or: {
//                     employeeName: { $regex: searchName.employeeName.trim(), $options: 'i' }
//                 }
//             });
//             if (employee.length < 1) {
//                 return res.status(400).send({ message: "Bad Request, No employee found" });
//             }
//             return res.status(200).send(employee);
//         }
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };


module.exports = {
    storeEmployees,
    getEmployees,
    getFilterEmployees
};

// EmployeeRouter.get('/', (req, res, next) => {
//     const filters = req.query;
//     const filteredEmployee = employeeData.filter(emp => {
//         let isValid = true;
//         for (key in filters) {
//             // console.log(key, emp[key], filters[key]);
//             isValid = isValid && emp[key] == filters[key];
//         }
//         return isValid;
//     });
//     res.send(filteredEmployee);
// });


// let code,message;
// const limit = 15;
//   const page = req.query.page ? parseInt(req.query.page) : 1;

// try{
//   if(Object.keys(req.query).length===0){
//     const employee =await rewardsModal.find({});
//   code=200;
//   const data=customPagination({data:rewards,page:page,limit:limit});
//   const resData=customResponse({code,data})
//   res.status(code).send(resData);  
//   }
//    else{  
//   const rewards = await rewardsModal.find({$or:[{reward_display_name: {$regex:searchName.search.trim(