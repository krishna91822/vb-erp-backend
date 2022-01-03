const chai = require("chai");
const expect = chai.expect;
const purchaseOrderModel = require("../src/models/poSow");
const Invoice = require("../src/models/invoicemodel");
const sinon = require("sinon");
var mocks = require("node-mocks-http");

const {
  createPoSow,
  getPoDeatil,
  getSortedPoList,
  updatePODetais,
  getClients,
  getProjects,
  getDetails,
} = require("../src/controllers/poSowController");

const { locale } = require("moment");

const stubValue = {
  Project_Id: "34cb1103244bd0700aa5fb7b",
  _id: "61cb1104744bd07a0aa5fb7b",
  Client_Name: "Yusuf Shekh",
  Project_Name: "SSW Solution",
  Client_Sponser: "VDT",
  Client_Finance_Controller: "QSE",
  Targetted_Resources: { Suresh: "true", Akash: "false" },
  Targeted_Res_AllocationRate: { ABC: 50, DCH: 60 },
  Status: "Active",
  Type: "PO",
  PO_Number: "PO0001",
  PO_Amount: 1224,
  Currency: "INR",
  Document_Name: "SSWdoc",
  POSOW_endDate: "2021-12-17T09:20:58.793+00:00",
  Remarks: "sdfhskjhdjv",
};

describe("PO/SOW Unit Testing with Mocha..!!", () => {
  beforeEach(function () {
    const stub = sinon.stub();
    stub.resetHistory();
  });

  describe("/GET/sort by ID PO/SOW", () => {
    let stub;
    let req;
    let res;
    beforeEach(() => {
      req = mocks.createRequest({
        params: {
          data: "Id",
        },
      });
      res = mocks.createResponse();
    });
    before(() => {});

    it("It should get all the po/sow bassed on ID", async function () {
      stub = sinon.stub(purchaseOrderModel, "find").returns(stubValue);
      const result = await getSortedPoList(req, res);
      var body = result._getData();
      body.should.be.a("object");
      // body.should.have.status("success");
      body.should.have.property("code").eql(200);
      stub.restore();
    });
  });

  describe("/GET/sort by other field PO/SOW", () => {
    let stub;
    let req;
    let res;
    beforeEach(() => {
      req = mocks.createRequest({
        params: {
          data: "Project_Name",
        },
      });
      res = mocks.createResponse();
    });
    before(() => {});

    it("It should get all the po/sow bassed on other field", async function () {
      stub = sinon.stub(purchaseOrderModel, "find").returns(stubValue);
      const result = await getSortedPoList(req, res);
      var body = result._getData();
      body.should.be.a("object");
      body.should.have.status("success");
      body.should.have.property("code").eql(200);
      stub.restore();
    });
  });

  describe("/GET/:id PO/SOW", () => {
    let req;
    let res;
    let objService;

    beforeEach(() => {
      req = mocks.createRequest({
        params: {
          id: stubValue._id,
        },
      });
      res = mocks.createResponse();
    });

    before(() => {});
    it("It should return PO/SOW details by a given ID", async function () {
      stub = sinon.stub(purchaseOrderModel, "findById").returns(stubValue);
      const result = await getPoDeatil(req, res);
      var body = result._getData();
      body.should.be.a("object");
      body.should.have.status("success");
      body.should.have.property("code").eql(200);
      // body.data.should.have.property("Project_Id").eql(stubValue.Project_Id);
      // body.data.should.have.property("Client_Name").eql(stubValue.Client_Name);
      // body.data.should.have
      //   .property("Project_Name")
      //   .eql(stubValue.Project_Name);
      // body.data.should.have
      //   .property("Client_Sponser")
      //   .eql(stubValue.Client_Sponser);
      // body.data.should.have
      //   .property("Client_Finance_Controller")
      //   .eql(stubValue.Client_Finance_Controller);
      // body.data.should.have
      //   .property("Targetted_Resources")
      //   .eql(stubValue.Targetted_Resources);
      // body.data.should.have
      //   .property("Targeted_Res_AllocationRate")
      //   .eql(stubValue.Targeted_Res_AllocationRate);
      // body.data.should.have.property("Status").eql(stubValue.Status);
      // body.data.should.have.property("Type").eql(stubValue.Type);
      // body.data.should.have.property("PO_Number").eql(stubValue.PO_Number);
      // body.data.should.have.property("PO_Amount").eql(stubValue.PO_Amount);
      // body.data.should.have.property("Currency").eql(stubValue.Currency);
      // body.data.should.have
      //   .property("Document_Name")
      //   .eql(stubValue.Document_Name);
      // body.data.should.have
      //   .property("POSOW_endDate")
      //   .eql(stubValue.POSOW_endDate);
      // body.data.should.have.property("Remarks").eql(stubValue.Remarks);
      body.data.should.have.property("_id").eql(stubValue._id);
      stub.restore();
    });
    after(() => {});
  });
});
