const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const app = require("../src/app");
const projectEmployeeModel = require("../src/models/projectEmployeeModel");

chai.use(chaiHttp);

// //testing for POST request
// describe("POST /allocations", () => {
//   it("Returns status(201)", (done) => {
//     let allocation = {
//       projectId: "61b8c18ce56e27b307b73166",
//       resources: [
//         {
//           empName: "divanshu",
//           allocationStartDate: "2021-12-15",
//           allocationEndDate: "2022-01-02",
//           allocationPercentage: "5",
//           rackRate: "5724",
//           empId: "61a9c8a943f77a62dd4ea7ef",
//         },
//       ],
//     };
//     chai
//       .request(app)
//       .post("/allocations")
//       .send(allocation)
//       .end((err, res) => {
//         res.should.have.status(201);
//         res.body.should.be.a("object");
//         res.body.should.have.property("allocationStartDate");
//         res.body.should.have.property("allocationEndDate");
//         res.body.should.have.property("allocationPercentage");
//         res.body.should.have.property("startDate");
//         res.body.should.have.property("rackRate");
//         res.body.should.have.property("empId");
//         done();
//       });
//   });
// });

// testing for GET  allocation request
describe("GET /allocation of PMO", () => {
  it("Returns status(200)", (done) => {
    chai
      .request(app)
      .get("/allocations")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

// testing for GET  allocation pagination request
describe("GET /allocation?limit=1&page=1 of PMO", () => {
  it("Returns status(200)", (done) => {
    chai
      .request(app)
      .get("/allocation?limit=1&page=1 ")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

// testing for GET  allocation request
describe("GET /allocation/onbech of PMO", () => {
  it("Returns status(200)", (done) => {
    chai
      .request(app)
      .get("/allocations/onbech")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

// testing for GET  OnBench pagination request
describe("GET /allocation/onbench?limit=1&page=1 of PMO", () => {
  it("Returns status(200)", (done) => {
    chai
      .request(app)
      .get("/allocation/onbench?limit=1&page=1 ")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

// testing for GET  OnBench sorting by field request
describe("GET /allocation//onbench/sorted/:fieldName of PMO", () => {
  it("Returns status(200)", (done) => {
    chai
      .request(app)
      .get("/allocation//onbench/sorted/empId ")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});
