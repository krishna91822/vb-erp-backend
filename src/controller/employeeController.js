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
    const { employeeName } = req.params;
    try {
        const filteredEmployee = await EmployeeInfoModel.find({ 'employeeName': { '$regex': `.*${employeeName}*.`, '$options': 'i' } });
        res.status(200).send(filteredEmployee);
    } catch (error) {
        res.status(400).send(error);
    }
};

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