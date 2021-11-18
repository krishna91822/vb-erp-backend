process.env.NODE_ENV = "test";
require("dotenv").config();
const EmployeeModel = require("../models/employeeModel");
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

describe("GET / ", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL);
    await new EmployeeModel({
      empId: "001",
      empRole: "USER",
      empDoj: "18-12-2001",
      empDepartment: "MGR",
      empDesignation: "SFT",
      empEmail: "dv@gdgaj.com",
      empName: "Div",
      empBand: "hey",
      empCtc: "6.50",
      empReportingManager: "Raj",
      empGraduation: true,
      empPostGraduation: false,
      empPersonalEmail: "div.vb@ahg",
      empPhoneNumber: "123654",
      empDob: "13-12-1997",
      empAboutMe: "Sup?",
      empHobbies: "Medidation",
      empPrimaryCpapability: [],
      empSkillSet: [],
      empCertification: [],
    }).save();
  });

  afterAll(async () => {
    //    await mongoose.connection.dropDatabase;
    await mongoose.connection.close();
  });

  test("It should respond with employees details", async () => {
    const response = await request(app).get("/employee/001");
    console.log(response.body[0]);
    expect(response.body[0]).toHaveProperty("empId");
    expect(response.body[0].empId).toBe("001");
    expect(response.body[0]).toHaveProperty("empDoj");
    expect(response.body[0].empDoj).toBe("18-12-2001");
    expect(response.body[0]).toHaveProperty("empDepartment");
    expect(response.body[0].empDepartment).toBe("MGR");
    expect(response.body[0]).toHaveProperty("empDesignation");
    expect(response.body[0].empDesignation).toBe("SFT");
    expect(response.body[0]).toHaveProperty("empEmail");
    expect(response.body[0].empEmail).toBe("dv@gdgaj.com");
    expect(response.body[0]).toHaveProperty("empName");
    expect(response.body[0].empName).toBe("Div");
    expect(response.body[0]).toHaveProperty("empBand");
    expect(response.body[0].empBand).toBe("hey");
    expect(response.body[0]).toHaveProperty("empCtc");
    expect(response.body[0].empCtc).toBe(6.5);
    expect(response.body[0]).toHaveProperty("empReportingManager");
    expect(response.body[0].empReportingManager).toBe("Raj");
    expect(response.body[0]).toHaveProperty("empPersonalEmail");
    expect(response.body[0].empPersonalEmail).toBe("div.vb@ahg");
    expect(response.body[0]).toHaveProperty("empPhoneNumber");
    expect(response.body[0].empPhoneNumber).toBe("123654");
    expect(response.body[0]).toHaveProperty("empDob");
    expect(response.body[0].empDob).toBe("13-12-1997");
    expect(response.body[0]).toHaveProperty("empAboutMe");
    expect(response.body[0].empAboutMe).toBe("Sup?");
    expect(response.body[0]).toHaveProperty("empHobbies");
    // expect(response.body[0].empHobbies).toBe(["Medidation"]);
    expect(response.body[0]).toHaveProperty("empPrimaryCapability");
    //expect(response.body[0].empPrimaryCpapability).toBe([]);
    expect(response.body[0]).toHaveProperty("empSkillSet");
    // expect(response.body[0].empSkillSet).toBe(["java"]);
    // expect(response.body[0]).toHaveProperty("empCertification");
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL);
    await new EmployeeModel({
      empId: "002",
      empRole: "USER",
      empDoj: "18-12-2050",
      empDepartment: "ahjs",
      empDesignation: "dkj",
      empEmail: "dasjk.com",
      empName: "Cj",
      empBand: "hio",
      empCtc: "13.00",
      empReportingManager: "dfs",
      empGraduation: true,
      empPostGraduation: false,
      empPersonalEmail: "ads@djas",
      empPhoneNumber: "1654",
      empDob: "1-3-9561",
      empAboutMe: "Sup?",
      empHobbies: "Medidation",
      empPrimaryCpapability: [],
      empSkillSet: [],
      empCertification: [],
    }).save();
  });

  afterAll(async () => {
    // await mongoose.connection.dropDatabase;
    await mongoose.connection.close();
  });

  test("It responds with the new data", async () => {
    const newEmp = await request(app).post("/employee").send({
      empId: "002",
      empRole: "USER",
      empDoj: "18-12-2050",
      empDepartment: "ahjs",
      empDesignation: "dkj",
      empEmail: "dasjk.com",
      empName: "Cj",
      empBand: "hio",
      empCtc: "13.00",
      empReportingManager: "dfs",
      empPersonalEmail: "ads@djas",
      empPhoneNumber: "1654",
      empDob: "1-3-9561",
      empAboutMe: "Sup?",
      empHobbies: "Medidation",
      empPrimaryCpapability: [],
      empSkillSet: [],
      empCertification: [],
    });
    console.log(newEmp.body);

    expect(newEmp.body).toHaveProperty("empId");
    expect(newEmp.body.empId).toBe("002");
    expect(newEmp.body).toHaveProperty("empDoj");
    expect(newEmp.body.empDoj).toBe("18-12-2050");
    expect(newEmp.body).toHaveProperty("empDepartment");
    expect(newEmp.body.empDepartment).toBe("ahjs");
    expect(newEmp.body).toHaveProperty("empDesignation");
    expect(newEmp.body.empDesignation).toBe("dkj");
    expect(newEmp.body).toHaveProperty("empEmail");
    expect(newEmp.body.empEmail).toBe("dasjk.com");
    expect(newEmp.body).toHaveProperty("empName");
    expect(newEmp.body.empName).toBe("Cj");
    expect(newEmp.body).toHaveProperty("empBand");
    expect(newEmp.body.empBand).toBe("hio");
    expect(newEmp.body).toHaveProperty("empCtc");
    expect(newEmp.body.empCtc).toBe(13.0);
    expect(newEmp.body).toHaveProperty("empReportingManager");
    expect(newEmp.body.empReportingManager).toBe("dfs");
    expect(newEmp.body).toHaveProperty("empPersonalEmail");
    expect(newEmp.body.empPersonalEmail).toBe("ads@djas");
    expect(newEmp.body).toHaveProperty("empPhoneNumber");
    expect(newEmp.body.empPhoneNumber).toBe("1654");
    expect(newEmp.body).toHaveProperty("empDob");
    expect(newEmp.body.empDob).toBe("1-3-9561");
    expect(newEmp.body).toHaveProperty("empAboutMe");
    expect(newEmp.body.empAboutMe).toBe("Sup?");
    expect(newEmp.body).toHaveProperty("empHobbies");
    expect(newEmp.body).toHaveProperty("empSkillSet");

    expect(newEmp.statusCode).toBe(200);
  });
});

describe("PATCH /", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL);
  });

  afterAll(async () => {
    //   await mongoose.connection.dropDatabase;
    await mongoose.connection.close();
  });

  test("It responds with an updated employee", async () => {
    const newEmp = await request(app).post("/employee").send({
      empId: "002",
      empRole: "USER",
      empDoj: "18-12-2050",
      empDepartment: "ahjs",
      empDesignation: "dkj",
      empEmail: "dasjk.com",
      empName: "Cj",
      empBand: "hio",
      empCtc: "13.00",
      empReportingManager: "dfs",
      empGraduation: true,
      empPostGraduation: false,
      empPersonalEmail: "ads@djas",
      empPhoneNumber: "1654",
      empDob: "1-3-9562",
      empAboutMe: "Sup?",
      empHobbies: "Medidation",
      empPrimaryCpapability: [],
      empSkillSet: [],
      empCertification: [],
    });
    const updatedEmp = await request(app)
      .patch(`/employee/002`)
      .send({ empName: "UpdatedName" });
    console.log(updatedEmp.body);
    expect(updatedEmp.body.empName).toBe("UpdatedName");
    expect(updatedEmp.body).toHaveProperty("empId");
    expect(updatedEmp.statusCode).toBe(200);
  });
});
