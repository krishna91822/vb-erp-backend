// process.env.NODE_ENV = "test";
// require("dotenv").config();
// const request = require("supertest");
// const app = require("../app");
// const mongoose = require("mongoose");
// const assert = require("assert");
// const requestModel = require("../models/requestModel");

// describe("Testing Request API", () => {
//   beforeAll(async () => {});
//   test("GET API Get All Requests test", async () => {
//     const response = await request(app)
//       .get("/request")
//       .set("Accept", "application/json");
//     expect(response.statusCode).toBe(200);
//     assert.equal(Array.isArray(response.body), true);
//   });
//   test("POST API test", async () => {
//     const data = {
//       id: "req1",
//       requesterName: "Name1",
//       requestType: "Request Type",
//       requestedOn: "11/10/21",
//       requestStatus: "PENDING",
//       message: "Please update my profile",
//       data: {
//         empName: "Name2",
//       },
//     };
//     const response = await request(app).post("/request").send(data);
//     expect(response.statusCode).toBe(201);
//     expect(response.body).toMatchObject(data);
//   });

//   test("POST API with empty data test", async () => {
//     const data = {};
//     const response = await request(app).post("/request").send(data);
//     expect(response.statusCode).toBe(400);
//   });
//   afterAll(async () => {
//     await requestModel.deleteMany({});
//   });
// });
