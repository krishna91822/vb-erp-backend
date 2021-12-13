process.env.NODE_ENV = "test";
let mongoose = require("mongoose");
let reviews = require("../src/models/ReviewModel");
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
const app = require("../app");
chai.use(chaiHttp);

//testing for get method
describe("/GET reviews", () => {
  it("it should fetch all data from myreviews collection", (done) => {
    let review = {
      reqName: "admin",
      reqType: "profile-creation",
      status: "accepted",
      reqId: 15,
      employeeDetails: {
        empName: "alan sajan",
        empEmail: "sajan@mail.com",
        empPersonalEmail: "alan@mail.com",
        empDoj: "2021-11-20",
        empDob: "2021-11-20",
        empDepartment: "sales",
        empDesignation: "marketing",
        empReportingManager: "sunilee",
        empConnections: 10,
        empHobbies: ["Music", "Dance"],
        empAboutMe: "i'm always cool..!",
        empCurrentAddress: "gujrat",
        empResidentialAddress: "gujrat",
        empBand: "12",
        empGraduation: "bba",
        empGraduationUniversity: "du",
        empPostGraduation: "mba",
        empPostGraduationUniversity: "iim",
        empPrimaryCapability: ["Communication"],
        empSkillSet: ["Communication skill"],
        empCertifications: ["Power Bi"],
        role: "employee",
        personalDetails: [],
        professionalDetails: [],
        skillsDetails: [],
      },
    };
    chai
      .request(app)
      .get("/reviews")
      .send(review)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        done();
      });
  });
});

describe("/POST reviews", () => {
  it("it should post all data into myreviews collection", (done) => {
    let review = {
      reqName: "admin",
      reqType: "profile-creation",
      status: "accepted",
      reqId: 15,
      employeeDetails: {
        empName: "alan sajan",
        empEmail: "sajan@mail.com",
        empPersonalEmail: "alan@mail.com",
        empDoj: "2021-11-20",
        empDob: "2021-11-20",
        empDepartment: "sales",
        empDesignation: "marketing",
        empReportingManager: "sunilee",
        empConnections: 10,
        empHobbies: ["Music", "Dance"],
        empAboutMe: "i'm always cool..!",
        empCurrentAddress: "gujrat",
        empResidentialAddress: "gujrat",
        empBand: "12",
        empGraduation: "bba",
        empGraduationUniversity: "du",
        empPostGraduation: "mba",
        empPostGraduationUniversity: "iim",
        empPrimaryCapability: ["Communication"],
        empSkillSet: ["Communication skill"],
        empCertifications: ["Power Bi"],
        role: "employee",
        personalDetails: [],
        professionalDetails: [],
        skillsDetails: [],
      },
    };
    chai
      .request(app)
      .post("/reviews")
      .send(review)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        //res.body.should.have.property("empId");
        done();
      });
  });
});
