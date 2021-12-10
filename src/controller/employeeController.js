const EmployeeInfoModel = require("../models/employeeModel");
// const {customPagination} = require("../utility/helper") 

const storeEmployees = async (req, res) => {
  try {
    const employee = await EmployeeInfoModel(req.body);
    employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Filtering
const getFilterEmployees = async (req, res) => {
  const searchName = req.query;
  try {
    if (Object.keys(req.query).length === 0) {
      // const page = req.query.page ? req.query.page : 1;
      // const limit = req.query.limit ? req.query.limit : 10;
      // code = 200;
      const employee = await EmployeeInfoModel.find({});
      // const data = customPagination({ data: employee, page, limit });
      // const resData = customResponse({ code, data });
      return res.status(200).send(employee);
    } else {
      // const page = req.query.page ? req.query.page : 1;
      // const limit = req.query.limit ? req.query.limit : 10;
      // code = 200;
      const employee = await EmployeeInfoModel.find({
        $or: [
          {
            employeeName: {
              $regex: searchName.employeeName.trim(),
              $options: "i",
            },
          },
        ],
      });
      if (employee.length < 1) {
        return res
          .status(400)
          .send({ message: "Bad Request, No employee found" });
      }
      // const data = customPagination({ data: employee, page, limit });
      // const resData = customResponse({ code, data });
      return res.status(200).send(employee);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  storeEmployees,
  // getEmployees,
  getFilterEmployees,
};

// const getFilterEmployees = async(req, res) => {
//     const employeeName = req.query;
//     try {
//         const filteredEmployee = await EmployeeInfoModel.find({
//             'employeeName': { '$regex': `.*${employeeName}*.`, '$options': 'i' }
//         });
//         res.status(200).send(filteredEmployee);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };

// const getEmployees = async(req, res) => {
//     try {
//         const employee = await EmployeeInfoModel.find({});
//         res.status(200).send(employee);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };
