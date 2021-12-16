process.env.NODE_ENV = "test";
require("dotenv").config();
const app = require("../src/app");
const mongoose = require("mongoose");
const { Employee } = require("../src/models/employeeModel");
const jwt = require("jsonwebtoken");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const should = chai.should();

describe("Employee API tests", () => {
  let token;
  let empId;
  before(async () => {
    const data = {
      empName: "ryan",
      role: "SUPER_ADMIN",
      empId: "33",
      empEmail: "ryan@email.com",
      empDoj: "12/12/21",
      empDepartment: "Development",
      empDesignation: "SDE",
      empBand: "emp band",
      empCtc: 0,
      empReportingManager: "ManagerName10",
      empPersonalEmail: "ryan@email.com",
      empPhoneNumber: "1231114891",
      empDob: "10/10/1998",
      empAboutMe: "About me goes here",
      empGraduation: "College name",
    };
    try {
      const employee = new Employee(data);
      const res = await employee.save();
      empId = res._id.toString();
      // token = jwt.sign(
      //   { email: data.empEmail, password: "myPassword" },
      //   process.env.JWT_SECRET
      // );
    } catch (err) {
      console.log(err);
    }
  });

  describe("Get employees from collection", () => {
    it("user can get all employees using GET API", (done) => {
      chai
        .request(app)
        .get("/employees")
        // .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.status.should.equal("success");
          // res.body.results.should.be.above(0);
          res.body.data.should.be.a("array");
          done();
        });
    });
  });

  describe("Get employee details by using _id", () => {
    it("Returns employee details using _id", (done) => {
      chai
        .request(app)
        .get(`/employees/${empId}`)
        // .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.status.should.equal("success");
          res.body.data.should.be.a("object");
          done();
        });
    });
  });

  describe("POST new employee ", () => {
    it("Creates a new employee and stores the document in the database", (done) => {
      const newEmployee = {
        empName: "rohan",
        role: "HR_ADMIN",
        empEmail: "rohan@email.com",
        empDoj: "12/12/21",
        empDepartment: "HR",
        empDesignation: "HR",
        empBand: "emp band",
        empCtc: 100000,
        empReportingManager: "ManagerName12",
        empPersonalEmail: "rohan_personal@email.com",
        empPhoneNumber: "1231004891",
        empDob: "10/10/1998",
        empAboutMe: "About me goes here",
        empGraduation: "College name",
      };
      chai
        .request(app)
        .post(`/employees/`)
        .send(newEmployee)
        // .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.a("object");
          res.body.status.should.equal("success");
          res.body.data.should.be.a("object");
          done();
        });
    });
  });

  describe("PATCH an employee", () => {
    it("Updates an employee using _id", (done) => {
      const data = {
        empCertifications: ["Aws", "Azure"],
        empSkillSet: ["Backend", "Dev Ops"],
      };

      chai
        .request(app)
        .patch(`/employees/${empId}`)
        .send(data)
        // .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.status.should.equal("success");
          res.body.data.should.be.a("object");
          done();
        });
    });
  });

  describe("DELETE an employee", () => {
    it("Deletes an employee using _id", (done) => {
      chai
        .request(app)
        .delete(`/employees/${empId}`)
        // .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(204);
          res.should.be.a("object");
          done();
        });
    });
  });

  after(async () => {
    console.log("end of tests");
  });
});
