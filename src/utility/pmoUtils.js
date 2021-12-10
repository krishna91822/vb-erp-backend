const { reduce, values } = require("lodash");

const getQueryString = (queryString) => {
  let query = [
    {
      vbProjectManager: { $regex: "", $options: "i" },
    },
  ];

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

  if (queryString.employeeName) {
    query.employeeName = queryString.employeeName;
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

  return query;
};

const getAllocationsFilteredData = (findObj, projectDetails) => {
  let details = projectDetails;
  if (findObj.projectId) {
    details = details.filter((detail) =>
      detail.projectId._id.valueOf().includes(findObj.projectId)
    );
  }

  if (findObj.empId) {
    details = details.filter((detail) =>
      detail.empId.empId.includes(findObj.empId)
    );
  }

  if (findObj.employeeName) {
    details = details.filter((detail) =>
      detail.empId.employeeName
        .toLowerCase()
        .includes(findObj.employeeName.toLowerCase())
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

  return details;
};

const getOnBenchFilteredData = (findObj, projectDetails) => {
  const reduceData = reduce(
    projectDetails,
    (result, value) => {
      if (!result[value.empId.empId]) {
        result[value.empId.empId] = {
          empId: value.empId.empId,
          employeeName: value.empId.employeeName,
          remainingAllocation: 100,
          projects: [],
        };
      }

      result[value.empId.empId].remainingAllocation =
        result[value.empId.empId].remainingAllocation -
        value.allocationPercentage;
      result[value.empId.empId].projects.push({
        allocationStartDate: value.allocationStartDate,
        allocationEndDate: value.allocationEndDate,
        allocationPercentage: value.allocationPercentage,
        rackRate: value.rackRate,
        vbProjectId: value.projectId.vbProjectId,
        vbProjectStatus: value.projectId.vbProjectStatus,
        projectName: value.projectId.projectName,
      });
      console.log("rupesh");
      return result;
    },
    {}
  );

  let details = values(reduceData);

  if (details.length) {
    details = details.filter((obj) => obj.remainingAllocation > 0);
  }

  if (findObj.empId) {
    details = details.filter((detail) => detail.empId.includes(findObj.empId));
  }

  if (findObj.employeeName) {
    details = details.filter((detail) =>
      detail.employeeName
        .toLowerCase()
        .includes(findObj.employeeName.toLowerCase())
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

  if (empId) {
    details = details.filter((detail) => detail.empId.empId.includes(empId));
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
