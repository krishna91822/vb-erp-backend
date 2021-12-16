const EmployeeInfoModel = require("../models/employeeModel");

const getFilteredEmp = async(req, res) => {
    const query = req.query;
    try {
        if (Object.keys(req.query).length === 0) {
            const filterEmployee = await EmployeeInfoModel.find({}, { empId: 1, empName: 1, empPrimaryCapability: 1 });
            return res.status(200).send(filterEmployee);
        } else {
            const filterEmployee = await EmployeeInfoModel.find({
                $or: [{
                    empName: {
                        $regex: query.empName.trim(),
                        $options: "i",
                    },
                }, ],
            }, { empId: 1, empName: 1, empPrimaryCapability: 1 });
            return res.status(200).send(filterEmployee);
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

const getManagers = async(req, res) => {
    const filterManagers = await EmployeeInfoModel.find({
        empDesignation: "Manager",
    }, { empName: 1 });
    return res.status(200).send(filterManagers);
};

module.exports = {
    getFilteredEmp,
    getManagers,
};