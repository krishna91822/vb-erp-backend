const { reduce, values } = require("lodash");
const moment = require("moment");

const getQueryString = (queryString) => {
    let query = [{
        vbProjectManager: { $regex: "", $options: "i" },
    }, ];

    if (queryString.vbProjectStatus) {
        query.push({
            vbProjectStatus: {
                $regex: queryString.vbProjectStatus,
                $options: "i",
            },
        });
    }

    if (queryString.clientName) {
        query.push({
            clientName: {
                $regex: queryString.clientName,
                $options: "i",
            },
        });
    }

    if (queryString.vbProjectId) {
        query.push({
            vbProjectId: {
                $regex: queryString.vbProjectId,
                $options: "i",
            },
        });
    }

    if (queryString.projectName) {
        query.push({
            projectName: {
                $regex: queryString.projectName,
                $options: "i",
            },
        });
    }

    if (queryString.startDate) {
        query.push({
            startDate: {
                $regex: queryString.startDate,
                $options: "i",
            },
        });
    }

    if (queryString.endDate) {
        query.push({
            endDate: {
                $regex: queryString.endDate,
                $options: "i",
            },
        });
    }

    if (queryString.allocationStartDate) {
        query.push({
            allocationStartDate: {
                $regex: queryString.allocationStartDate,
                $options: "i",
            },
        });
    }

    if (queryString.allocationEndDate) {
        query.push({
            allocationEndDate: {
                $regex: queryString.allocationEndDate,
                $options: "i",
            },
        });
    }

    return query;
};

const getAllocationQuery = (queryString) => {
    const query = {};

    if (queryString.projectId) {
        query.projectId = queryString.projectId;
    }

    if (queryString.empId) {
        query.empId = queryString.empId;
    }

    if (queryString.empName) {
        query.empName = queryString.empName;
    }

    if (queryString.allocatedProject) {
        query.allocatedProject = queryString.allocatedProject;
    }

    if (queryString.allocationPercentage) {
        query.allocationPercentage = queryString.allocationPercentage;
    }

    if (queryString.remainingAllocation) {
        query.remainingAllocation = queryString.remainingAllocation;
    }

    if (queryString.allocationStartDate) {
        query.allocationStartDate = queryString.allocationStartDate;
    }

    if (queryString.allocationEndDate) {
        query.allocationEndDate = queryString.allocationEndDate;
    }

    return query;
};

const getAllocationsFilteredData = (findObj, projectDetails) => {
    let details = projectDetails;
    const curr_date = moment().format("YYYY-MM-DD");

    details = details.filter((detail) => {
        if (
            moment(curr_date).isSameOrAfter(detail.allocationStartDate) &&
            moment(curr_date).isSameOrBefore(detail.allocationEndDate)
        ) {
            return detail;
        }
        return null;
    });

    if (findObj.projectId) {
        details = details.filter((detail) =>
            detail.projectId._id.valueOf().includes(findObj.projectId)
        );
    }

    if (findObj.empId) {
        details = details.filter((detail) =>
            detail.empId.empId.toString().includes(findObj.empId)
        );
    }
    if (findObj.empName) {
        details = details.filter((detail) =>
            detail.empId.empName.toLowerCase().includes(findObj.empName.toLowerCase())
        );
    }

    if (findObj.allocatedProject) {
        details = details.filter((detail) =>
            detail.projectId.projectName
            .toLowerCase()
            .includes(findObj.allocatedProject.toLowerCase())
        );
    }

    if (findObj.allocationPercentage) {
        details = details.filter(
            (detail) =>
            detail.allocationPercentage === parseInt(findObj.allocationPercentage)
        );
    }

    if (findObj.allocationStartDate) {
        details = details.filter(
            (detail) =>
            detail.allocationStartDate === parseInt(findObj.allocationStartDate)
        );
    }

    if (findObj.allocationEndDate) {
        details = details.filter(
            (detail) =>
            detail.allocationEndDate === parseInt(findObj.allocationEndDate)
        );
    }

    return details;
};

const getOnBenchFilteredData = (findObj, projectDetails) => {
    const curr_date = moment().format("YYYY-MM-DD");

    const reduceData = reduce(
        projectDetails,
        (result, value) => {
            if (!result[value.empId.empId]) {
                result[value.empId.empId] = {
                    empId: value.empId.empId,
                    empName: value.empId.empName,
                    remainingAllocation: 100,
                    projects: [],
                };
            }

            if (
                moment(curr_date).isSameOrAfter(value.allocationStartDate) &&
                moment(curr_date).isSameOrBefore(value.allocationEndDate)
            ) {
                result[value.empId.empId].remainingAllocation =
                    result[value.empId.empId].remainingAllocation -
                    value.allocationPercentage;
            }

            result[value.empId.empId].projects.push({
                allocationStartDate: value.allocationStartDate,
                allocationEndDate: value.allocationEndDate,
                allocationPercentage: value.allocationPercentage,
                rackRate: value.rackRate,
                vbProjectId: value.projectId.vbProjectId,
                vbProjectStatus: value.projectId.vbProjectStatus,
                projectName: value.projectId.projectName,
            });
            return result;
        }, {}
    );

    let details = values(reduceData);

    if (details.length) {
        details = details.filter((obj) => obj.remainingAllocation > 0);
    }

    if (findObj.empId) {
        details = details.filter((detail) => detail.empId.includes(findObj.empId));
    }

    if (findObj.empName) {
        details = details.filter((detail) =>
            detail.empName.toLowerCase().includes(findObj.empName.toLowerCase())
        );
    }

    if (findObj.remainingAllocation) {
        details = details.filter(
            (detail) =>
            detail.remainingAllocation === parseInt(findObj.remainingAllocation)
        );
    }

    return details;
};

const getTotalAllocationCalculated = (empId, projectDetails) => {
    let details = projectDetails;
    const currentDate = moment().format("YYYY-MM-DD");

    if (empId) {
        details = details.filter(
            (detail) =>
            detail.empId.empId.toString() === empId &&
            moment(detail.allocationEndDate, "YYYY-MM-DD").isSameOrAfter(
                currentDate,
                "YYYY-MM-DD"
            )
        );
    }

    const totalAllocation = reduce(
        details,
        (result, value) => result + value.allocationPercentage,
        0
    );

    return empId ? totalAllocation : 0;
};

module.exports = {
    getQueryString,
    getAllocationQuery,
    getAllocationsFilteredData,
    getOnBenchFilteredData,
    getTotalAllocationCalculated,
};