process.env.NODE_ENV = "test";
require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const reviewSchema = require("../models/ReviewModel");
const employeeSchema = require("../src/models/ReviewModel");

//getting from review Collection
describe("GET / ", () => {
  beforeAll(async () => {
    await new reviewSchema({
      ID: 201,
      ReqId: "ebbbc11b-af6b-4e9d-bd8c-ce94ae7b86a8",
      ReqName: "Di",
      ReqOn: "13/4",
      ReqType: "Post",
      Status: "Accepted",
      empName: "iv",
      empId: "004",
      empEmail: "dv@gdaj.com",
      empDoj: "18-2-2001",
      empDepartment: "MG",
      empDesignation: "SF",
      empBand: "hey",
      empCtc: 6.5,
      empReportingManager: "Raj",
      empGraduation: "",
      empPostGraduation: "",
      empPersonalEmail: "div.v@ahg",
      empPhoneNumber: "12364",
      empDob: "13-12-1997",
      empAboutMe: "Sup?",
      empHobbies: [],
      empPrimaryCapability: [],
      empSkillSet: [],
      empCertifications: [],
      empRole: "USER",
    }).save();
  });

  test("It should respond with review collection", async () => {
    const response = await request(app).get(
      "/reviews/ebbbc11b-af6b-4e9d-bd8c-ce94ae7b86a8"
    );
    expect(response.body).toHaveProperty("empId");
    expect(response.body.empId).toBe("004");
    expect(response.body).toHaveProperty("Status");
    expect(response.body.Status).toBe("Accepted");
    expect(response.body).toHaveProperty("ReqId");
    expect(response.body.ReqId).toBe("ebbbc11b-af6b-4e9d-bd8c-ce94ae7b86a8");
    expect(response.body).toHaveProperty("empDoj");
    expect(response.body.empDoj).toBe("18-2-2001");
    expect(response.body).toHaveProperty("empDepartment");
    expect(response.body.empDepartment).toBe("MG");
    expect(response.body).toHaveProperty("empDesignation");
    expect(response.body.empDesignation).toBe("SF");
    expect(response.body).toHaveProperty("empEmail");
    expect(response.body.empEmail).toBe("dv@gdaj.com");
    expect(response.body).toHaveProperty("empName");
    expect(response.body.empName).toBe("iv");
    expect(response.body).toHaveProperty("empBand");
    expect(response.body.empBand).toBe("hey");
    expect(response.body).toHaveProperty("empCtc");
    expect(response.body.empCtc).toBe(6.5);
    expect(response.body).toHaveProperty("empReportingManager");
    expect(response.body.empReportingManager).toBe("Raj");
    expect(response.body).toHaveProperty("empPersonalEmail");
    expect(response.body.empPersonalEmail).toBe("div.v@ahg");
    expect(response.body).toHaveProperty("empPhoneNumber");
    expect(response.body.empPhoneNumber).toBe("12364");
    expect(response.body).toHaveProperty("empDob");
    expect(response.body.empDob).toBe("13-12-1997");
    expect(response.body).toHaveProperty("empAboutMe");
    expect(response.body.empAboutMe).toBe("Sup?");
    expect(response.body).toHaveProperty("empHobbies");
    expect(response.body).toHaveProperty("empPrimaryCapability");
    expect(response.body).toHaveProperty("empSkillSet");
    expect(response.body).toHaveProperty("empCertifications");
    expect(response.statusCode).toBe(200);
  });
});

//getting from Employee Collection
describe("GET / ", () => {
  beforeAll(async () => {
    await new employeeSchema({
      empName: "iv",
      empId: "004",
      empEmail: "dv@gdaj.com",
      empDoj: "18-2-2001",
      empDepartment: "MG",
      empDesignation: "SF",
      empBand: "hey",
      empCtc: 6.5,
      empReportingManager: "Raj",
      empGraduation: "",
      empPostGraduation: "",
      empPersonalEmail: "div.v@ahg",
      empPhoneNumber: "12364",
      empDob: "13-12-1997",
      empAboutMe: "Sup?",
      empHobbies: [],
      empPrimaryCapability: [],
      empSkillSet: [],
      empCertifications: [],
      empRole: "USER",
    }).save();
  });

  test("It should respond with employees details from employee collection", async () => {
    const response = await request(app).get("/employee/004");
    expect(response.body).toHaveProperty("empId");
    expect(response.body.empId).toBe("004");
    expect(response.body).toHaveProperty("empDoj");
    expect(response.body.empDoj).toBe("18-2-2001");
    expect(response.body).toHaveProperty("empDepartment");
    expect(response.body.empDepartment).toBe("MG");
    expect(response.body).toHaveProperty("empDesignation");
    expect(response.body.empDesignation).toBe("SF");
    expect(response.body).toHaveProperty("empEmail");
    expect(response.body.empEmail).toBe("dv@gdaj.com");
    expect(response.body).toHaveProperty("empName");
    expect(response.body.empName).toBe("iv");
    expect(response.body).toHaveProperty("empBand");
    expect(response.body.empBand).toBe("hey");
    expect(response.body).toHaveProperty("empCtc");
    expect(response.body.empCtc).toBe(6.5);
    expect(response.body).toHaveProperty("empReportingManager");
    expect(response.body.empReportingManager).toBe("Raj");
    expect(response.body).toHaveProperty("empPersonalEmail");
    expect(response.body.empPersonalEmail).toBe("div.v@ahg");
    expect(response.body).toHaveProperty("empPhoneNumber");
    expect(response.body.empPhoneNumber).toBe("12364");
    expect(response.body).toHaveProperty("empDob");
    expect(response.body.empDob).toBe("13-12-1997");
    expect(response.body).toHaveProperty("empAboutMe");
    expect(response.body.empAboutMe).toBe("Sup?");
    expect(response.body).toHaveProperty("empHobbies");
    expect(response.body).toHaveProperty("empPrimaryCapability");
    expect(response.body).toHaveProperty("empSkillSet");
    expect(response.body).toHaveProperty("empCertifications");
    expect(response.statusCode).toBe(200);
  });
});

//will change the status (in review Collection) and update the employee Collectin
describe("PATCH /", () => {
  test("It responds with updated status in review collection and new data in employee collection", async () => {
    const newEmp = await request(app)
      .patch(`/reviews/ebbbc11b-af6b-4e9d-bd8c-ce94ae7b86a8`)
      .send({
        ID: 201,
        ReqId: "ebbbc11b-af6b-4e9d-bd8c-ce94ae7b86a8",
        ReqName: "Di",
        ReqOn: "13/4",
        ReqType: "Post",
        Status: "Accepted",
        empName: "iv",
        empId: "004",
        empEmail: "dv@gdaj.com",
        empDoj: "18-2-2001",
        empDepartment: "MG",
        empDesignation: "SF",
        empBand: "hey",
        empCtc: 6.5,
        empReportingManager: "Raj",
        empGraduation: "",
        empPostGraduation: "",
        empPersonalEmail: "div.v@ahg",
        empPhoneNumber: "12364",
        empDob: "13-12-1997",
        empAboutMe: "Sup?",
        empHobbies: [],
        empPrimaryCapability: [],
        empSkillSet: [],
        empCertifications: [],
        empRole: "APPROVER",
      });

    expect(newEmp.body.Status).toBe("Accepted");
    expect(newEmp.body).toHaveProperty("empId");
    expect(newEmp.statusCode).toBe(200);

    describe("GET / ", () => {
      test("It should respond with review collection", async () => {
        const response = await request(app).get("/employee/004");
        expect(response.body).toHaveProperty("empId");
        expect(response.body.empId).toBe("004");
        expect(response.body).toHaveProperty("empDoj");
        expect(response.body.empDoj).toBe("18-2-2001");
        expect(response.body).toHaveProperty("empDepartment");
        expect(response.body.empDepartment).toBe("MG");
        expect(response.body).toHaveProperty("empDesignation");
        expect(response.body.empDesignation).toBe("SF");
        expect(response.body).toHaveProperty("empEmail");
        expect(response.body.empEmail).toBe("dv@gdaj.com");
        expect(response.body).toHaveProperty("empName");
        expect(response.body.empName).toBe("iv");
        expect(response.body).toHaveProperty("empBand");
        expect(response.body.empBand).toBe("hey");
        expect(response.body).toHaveProperty("empCtc");
        expect(response.body.empCtc).toBe(6.5);
        expect(response.body).toHaveProperty("empReportingManager");
        expect(response.body.empReportingManager).toBe("Raj");
        expect(response.body).toHaveProperty("empPersonalEmail");
        expect(response.body.empPersonalEmail).toBe("div.v@ahg");
        expect(response.body).toHaveProperty("empPhoneNumber");
        expect(response.body.empPhoneNumber).toBe("12364");
        expect(response.body).toHaveProperty("empDob");
        expect(response.body.empDob).toBe("13-12-1997");
        expect(response.body).toHaveProperty("empAboutMe");
        expect(response.body.empAboutMe).toBe("Sup?");
        expect(response.body).toHaveProperty("empHobbies");
        expect(response.body).toHaveProperty("empPrimaryCapability");
        expect(response.body).toHaveProperty("empSkillSet");
        expect(response.body).toHaveProperty("empCertifications");
        expect(response.statusCode).toBe(200);
      });
    });
  });
});

describe("POST /", () => {
  test("It responds with the newly created data under reviews collection", async () => {
    const newEmp = await request(app).post("/reviews").send({
      ID: 205,
      ReqId: "ebbbc11b-af6b-4e9d-bd8c",
      ReqName: "Divy",
      ReqOn: "13/46",
      ReqType: "Posted",
      Status: "Pending",
      empName: "Divy",
      empId: "444",
      empEmail: "d@gdaj.com",
      empDoj: "18-2-2000",
      empDepartment: "MG",
      empDesignation: "SF",
      empBand: "hey",
      empCtc: 6.5,
      empReportingManager: "Raj",
      empGraduation: "",
      empPostGraduation: "",
      empPersonalEmail: "div.@ahg",
      empPhoneNumber: "1234",
      empDob: "13-12-1997",
      empAboutMe: "Sup?",
      empHobbies: [],
      empPrimaryCapability: [],
      empSkillSet: [],
      empCertifications: [],
      empRole: "USER",
    });

    expect(response.body).toHaveProperty("empId");
    expect(response.body.empId).toBe("444");
    expect(response.body).toHaveProperty("Status");
    expect(response.body.Status).toBe("Pending");
    expect(response.body).toHaveProperty("ReqId");
    expect(response.body.ReqId).toBe("ebbbc11b-af6b-4e9d-bd8c");
    expect(response.body).toHaveProperty("empDoj");
    expect(response.body.empDoj).toBe("18-2-2000");
    expect(response.body).toHaveProperty("empDepartment");
    expect(response.body.empDepartment).toBe("MG");
    expect(response.body).toHaveProperty("empDesignation");
    expect(response.body.empDesignation).toBe("SF");
    expect(response.body).toHaveProperty("empEmail");
    expect(response.body.empEmail).toBe("d@gdaj.com");
    expect(response.body).toHaveProperty("empName");
    expect(response.body.empName).toBe("Divy");
    expect(response.body).toHaveProperty("empBand");
    expect(response.body.empBand).toBe("hey");
    expect(response.body).toHaveProperty("empCtc");
    expect(response.body.empCtc).toBe(6.5);
    expect(response.body).toHaveProperty("empReportingManager");
    expect(response.body.empReportingManager).toBe("Raj");
    expect(response.body).toHaveProperty("empPersonalEmail");
    expect(response.body.empPersonalEmail).toBe("div.@ahg");
    expect(response.body).toHaveProperty("empPhoneNumber");
    expect(response.body.empPhoneNumber).toBe("1234");
    expect(response.body).toHaveProperty("empDob");
    expect(response.body.empDob).toBe("13-12-1997");
    expect(response.body).toHaveProperty("empAboutMe");
    expect(response.body.empAboutMe).toBe("Sup?");
    expect(response.body).toHaveProperty("empHobbies");
    expect(response.body).toHaveProperty("empPrimaryCapability");
    expect(response.body).toHaveProperty("empSkillSet");
    expect(response.body).toHaveProperty("empCertifications");
    expect(response.statusCode).toBe(200);
  });

  afterAll(async () => {
    await employeeSchema.deleteMany({});
    await reviewSchema.deleteMany({});
  });
});
