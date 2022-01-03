process.env.NODE_ENV = "test";

const chai = require("chai");
const expect = chai.expect;
const purchaseOrderModel = require("../src/models/poSow");
const Invoice = require("../src/models/invoicemodel");
const sinon = require("sinon");
var mocks = require("node-mocks-http");

const {
  newInvoice,
  getInvoiceDetails,
  getInvoiceDetailsById,
  getRelatedInvoices,
  updateInvoice,
} = require("../src/controllers/invoicecontroller");
const { locale } = require("moment");
const templateModel = require("../src/models/emailtemplate");

const stubValue = {
  _id: "61cb1104744bd07a0aa5fb7b",
  PO_Id: "61cb1103744bd07a0aa5fb79",
  client_sponsor: "Satya Nadella",
  client_finance_controller: "Gopal Krishna",
  invoice_raised: "Yes",
  invoice_received: "Yes",
  invoice_amount_received: 1234,
  amount_received_on: "2021-04-09",
  Remarks: null,
  vb_bank_account: "40141411111222",
};
const emailValue = {
  subject : "Testing Invoice",
  body: "Email value for testing invoice",
  to: "abc@xyz.com"
}
const newData = {
  PO_Id: "61cb1103744bd07a0aa5fb79",
  client_sponsor: "Satya Nadella",
  client_finance_controller: "Gopal Krishna",
  invoice_raised: "Yes",
  invoice_received: "Yes",
  invoice_amount_received: 1234,
  amount_received_on: "2021-04-09",
  Remarks: null,
  vb_bank_account: "40141411111222",
}
const errorValue = {
  client_finance_controller: "Gopal Krishna",
  invoice_raised: "Yes",
  invoice_received: "Yes",
  invoice_amount_received: 1234,
  amount_received_on: "2021-04-09",
  Remarks: null,
  vb_bank_account: "40141411111222",
}

describe("Invoice Unit Testing...!", function () {
  this.beforeEach(function () {
    const stub = sinon.stub();
    stub.resetHistory();
  });
  describe("Get Invoices details", function () {
    let stub;
    let req;
    let res;
    beforeEach(() => {
      req = mocks.createRequest({
        params: {
          id: stubValue._id,
        },
      });
      res = mocks.createResponse();
    });
    before(()=>{})
    it("It should throw Internal Server Error", async function () {
      req = mocks.createRequest({
        params: {
          id: null,
        },
      });
      stub = sinon.stub(Invoice, "findById").returns(stubValue);
      const result = await getInvoiceDetailsById(req, res);
      var body = result._getData();
      body.should.be.a("object");
      body.should.have.status("failure");
      body.should.have.property("code").eql(500);
      body.should.have.property("message").eql("Internal server error");
      stub.restore();
    });
    it("It should return invoice details of a given ID", async function () {
      stub = sinon.stub(Invoice, "findById").returns({
        populate: sinon.stub().resolves(stubValue),
      });
      const result = await getInvoiceDetailsById(req, res);
      var body = result._getData();

      body.should.be.a("object");
      body.should.have.status("success");
      body.should.have.property("code").eql(200);
      body.data.should.have.property("PO_Id").eql(stubValue.PO_Id);
      body.data.should.have
        .property("client_sponsor")
        .eql(stubValue.client_sponsor);
      body.data.should.have
        .property("client_finance_controller")
        .eql(stubValue.client_finance_controller);
      body.data.should.have
        .property("invoice_raised")
        .eql(stubValue.invoice_raised);
      body.data.should.have
        .property("invoice_amount_received")
        .eql(stubValue.invoice_amount_received);
      body.data.should.have
        .property("vb_bank_account")
        .eql(stubValue.vb_bank_account);
      body.data.should.have
        .property("amount_received_on")
        .eql(stubValue.amount_received_on);
      body.data.should.have.property("_id").eql(stubValue._id);

      stub.restore();
    });
    after(() => {});
  });

  describe("Get Invoices", function () {
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
    
    it("It should throw query validation Error",async function() {
      req = mocks.createRequest({
        params: {
          data: "Id",
        },
        query: {
          page: -1
        }
      });
      stub = sinon.stub(Invoice,"aggregate").returns(stubValue)
      const result = await getInvoiceDetails(req, res);
      var body = result._getData();
      body.should.be.a("object");
      body.should.have.status("failure");
      body.should.have.property("code").eql(422);
      body.should.have.property("message").eql("Invalid request Query");
      stub.restore();
    })
    it("It should throw Internal Server Error", async function () {
      stub = sinon.stub(Invoice, "aggregate").returns(stubValue);
      const result = await getInvoiceDetails(req, res);
      var body = result._getData();
      body.should.be.a("object");
      body.should.have.status("failure");
      body.should.have.property("code").eql(500);
      body.should.have.property("message").eql("Internal server error");
      stub.restore();
    });
    it("It should get all the invoices bassed on ID", async function () {
      stub = sinon.stub(Invoice, "aggregate").returns({
        slice: sinon.stub().resolves(stubValue),
      });
      const result = await getInvoiceDetails(req, res);
      var body = result._getData();
      body.should.be.a("object");
      body.should.have.status("success");
      body.should.have.property("code").eql(200);
      stub.restore();
    });
    after(() => {});
    it("It should get all the invoices bassed on Client_Name", async function () {
      req = mocks.createRequest({
        params: {
          data: "Client_Name",
        },
      });
      stub = sinon.stub(Invoice, "aggregate").returns({
        $lookup:sinon.stub().returnsThis(),
        $unwind: sinon.stub().returnsThis(),
        collation: sinon.stub().returnsThis(),
        slice: sinon.stub().returns(stubValue)
      });
      const result = await getInvoiceDetails(req, res);
      var body = result._getData();
      body.should.be.a("object");
      body.should.have.status("success");
      body.should.have.property("code").eql(200);
      body.data.results.should.have.property("PO_Id").eql(stubValue.PO_Id);
      body.data.results.should.have
        .property("client_sponsor")
        .eql(stubValue.client_sponsor);
      body.data.results.should.have
        .property("client_finance_controller")
        .eql(stubValue.client_finance_controller);
      body.data.results.should.have
        .property("invoice_raised")
        .eql(stubValue.invoice_raised);
      body.data.results.should.have
        .property("invoice_amount_received")
        .eql(stubValue.invoice_amount_received);
      body.data.results.should.have
        .property("vb_bank_account")
        .eql(stubValue.vb_bank_account);
      body.data.results.should.have
        .property("amount_received_on")
        .eql(stubValue.amount_received_on);
      body.data.results.should.have.property("_id").eql(stubValue._id);
      stub.restore();
    });
    after(() => {});

    it("It should get all the invoices bassed on Project_Name", async function () {
      req = mocks.createRequest({
        params: {
          data: "Project_Name",
        },
      });
      stub = sinon.stub(Invoice, "aggregate").returns({
        $lookup:sinon.stub().returnsThis(),
        $unwind: sinon.stub().returnsThis(),
        collation: sinon.stub().returnsThis(),
        slice: sinon.stub().returns(stubValue)
      });
      const result = await getInvoiceDetails(req, res);
      var body = result._getData();
      body.should.be.a("object");
      body.should.have.status("success");
      body.should.have.property("code").eql(200);
      body.data.results.should.have.property("PO_Id").eql(stubValue.PO_Id);
      body.data.results.should.have
        .property("client_sponsor")
        .eql(stubValue.client_sponsor);
      body.data.results.should.have
        .property("client_finance_controller")
        .eql(stubValue.client_finance_controller);
      body.data.results.should.have
        .property("invoice_raised")
        .eql(stubValue.invoice_raised);
      body.data.results.should.have
        .property("invoice_amount_received")
        .eql(stubValue.invoice_amount_received);
      body.data.results.should.have
        .property("vb_bank_account")
        .eql(stubValue.vb_bank_account);
      body.data.results.should.have
        .property("amount_received_on")
        .eql(stubValue.amount_received_on);
      body.data.results.should.have.property("_id").eql(stubValue._id);
      stub.restore();
    });
    after(() => {});

    it("It should get all the invoices bassed on invoice_amount_received", async function () {
      req = mocks.createRequest({
        params: {
          data: "invoice_amount_received",
        },
      });
      stub = sinon.stub(Invoice, "aggregate").returns({
        $lookup:sinon.stub().returnsThis(),
        $unwind: sinon.stub().returnsThis(),
        sort: sinon.stub().returnsThis(),
        slice: sinon.stub().returns(stubValue)
      });
      const result = await getInvoiceDetails(req, res);
      var body = result._getData();
      body.should.be.a("object");
      body.should.have.status("success");
      body.should.have.property("code").eql(200);
      body.data.results.should.have.property("PO_Id").eql(stubValue.PO_Id);
      body.data.results.should.have
        .property("client_sponsor")
        .eql(stubValue.client_sponsor);
      body.data.results.should.have
        .property("client_finance_controller")
        .eql(stubValue.client_finance_controller);
      body.data.results.should.have
        .property("invoice_raised")
        .eql(stubValue.invoice_raised);
      body.data.results.should.have
        .property("invoice_amount_received")
        .eql(stubValue.invoice_amount_received);
      body.data.results.should.have
        .property("vb_bank_account")
        .eql(stubValue.vb_bank_account);
      body.data.results.should.have
        .property("amount_received_on")
        .eql(stubValue.amount_received_on);
      body.data.results.should.have.property("_id").eql(stubValue._id);
      stub.restore();
    });
    after(() => {});

    it("It should execute else part", async function () {
      req = mocks.createRequest({
        params: {
          data: "Po_Id",
        },
      });
      stub = sinon.stub(Invoice, "aggregate").returns({
        $lookup:sinon.stub().returnsThis(),
        $unwind: sinon.stub().returnsThis(),
        sort: sinon.stub().returnsThis(),
        slice: sinon.stub().returns(stubValue)
      });
      const result = await getInvoiceDetails(req, res);
      var body = result._getData();
      body.should.be.a("object");
      body.should.have.status("failure");
      body.should.have.property("code").eql(400);
      body.should.have.property("message").eql("something went wrong!!");
      stub.restore();
    });
    after(() => {});
  });

  describe("Get Related Invoices", function () {
    let stub;
    let req;
    let res;
    beforeEach(() => {
      req = mocks.createRequest({
        query:{
          id: stubValue._id
        }
      });
      res = mocks.createResponse();
    });
    before(() => {});
    // it("It should throw Internal Server Error", async function () {
    //   req = null;
    //   stub = sinon.stub(Invoice, "aggregate").returns(stubValue);
    //   const result = await getRelatedInvoices(req, res);
    //   var body = result._getData();
    //   console.log(body)
    //   body.should.be.a("object");
    //   body.should.have.status("failure");
    //   body.should.have.property("code").eql(500);
    //   body.should.have.property("message").eql("Internal server error");
    //   stub.restore();
    // });
    it("It should return all the invoices related to given ID", async function () {
      stub = sinon.stub(Invoice, "aggregate").returns(stubValue);
      const result = await getRelatedInvoices(req, res);
      var body = result._getData();
      body.should.be.a("object");
      body.should.have.status("success");
      body.should.have.property("code").eql(200);
      body.data.should.have.property("PO_Id").eql(stubValue.PO_Id);
      body.data.should.have
        .property("client_sponsor")
        .eql(stubValue.client_sponsor);
      body.data.should.have
        .property("client_finance_controller")
        .eql(stubValue.client_finance_controller);
      body.data.should.have
        .property("invoice_raised")
        .eql(stubValue.invoice_raised);
      body.data.should.have
        .property("invoice_amount_received")
        .eql(stubValue.invoice_amount_received);
      body.data.should.have
        .property("vb_bank_account")
        .eql(stubValue.vb_bank_account);
      body.data.should.have
        .property("amount_received_on")
        .eql(stubValue.amount_received_on);
      body.data.should.have.property("_id").eql(stubValue._id);

      stub.restore();
    });
    after(() => {});
  });

  describe("Update Invoices details", function () {
    let stub;
    let req;
    let res;
    beforeEach(() => {
      req = mocks.createRequest({
        params: {
          id: stubValue._id,
        },
        body: errorValue
      });
      res = mocks.createResponse();
    });
    before(() => {});
    it("It should throw Validation Error", async function(){
      stub = sinon.stub(Invoice, "updateOne").returns(stubValue);
      const result = await updateInvoice(req, res);
      var body = result._getData();
      body.should.be.a("object");
      body.should.have.status("failure");
      body.should.have.property("code").eql(422);
      body.should.have.property("message").eql("Invalid update data");
      stub.restore()
    })
    it("It should should throw Internal server Error", async function () {
      req = mocks.createRequest({
        params: {
          id: stubValue._id,
        },
        body: newData
      });
      stub = sinon.stub(Invoice, "updateOne").returns(stubValue);
      const result = await updateInvoice(req, res);
      var body = result._getData();
      body.should.be.a("object");
      body.should.have.status("failure");
      body.should.have.property("code").eql(500);
      body.should.have.property("message").eql("Internal server error");
      stub.restore()
    });
    it("It should update the invoice details of a given ID", async function () {
      req = mocks.createRequest({
        params: {
          id: stubValue._id,
        },
        body: newData
      });
      stub = sinon.stub(Invoice, "updateOne").returns(stubValue);
      const stub2 = sinon.stub(Invoice,"findOne").returns({
        populate: sinon.stub().returns(stubValue)
      })
      const emailStub = sinon.stub(templateModel,"findOne").returns(emailValue)
      const result = await updateInvoice(req, res);
      var body = result._getData();
      body.should.be.a("object");
      body.should.have.status("success");
      body.should.have.property("code").eql(200);
      body.data.should.have.property("PO_Id").eql(stubValue.PO_Id);
      body.data.should.have
        .property("client_sponsor")
        .eql(stubValue.client_sponsor);
      body.data.should.have
        .property("client_finance_controller")
        .eql(stubValue.client_finance_controller);
      body.data.should.have
        .property("invoice_raised")
        .eql(stubValue.invoice_raised);
      body.data.should.have
        .property("invoice_amount_received")
        .eql(stubValue.invoice_amount_received);
      body.data.should.have
        .property("vb_bank_account")
        .eql(stubValue.vb_bank_account);
      body.data.should.have
        .property("amount_received_on")
        .eql(stubValue.amount_received_on);
      body.data.should.have.property("_id").eql(stubValue._id);

      stub.restore();
      stub2.restore();
      emailStub.restore()
    });
    after(() => {});
  });

  describe("Create new Invoice", function () {
    let stub;
    let req;
    let res;
    beforeEach(() => {
      req = mocks.createRequest({
        params: {
          id: stubValue._id,
        },
        body: errorValue
      });
      res = mocks.createResponse();
    });
    before(() => {});
    it("It should throw Validation Error", async function(){
      stub = sinon.stub(Invoice, "create").returns(stubValue);
      const result = await newInvoice(req, res);
      var body = result._getData();
      body.should.be.a("object");
      body.should.have.status("failure");
      body.should.have.property("code").eql(422);
      body.should.have.property("message").eql("Invalid data");
      stub.restore()
    })
    it("It should should throw Internal server Error", async function () {
      req = mocks.createRequest({
        params: {
          id: stubValue._id,
        },
        body: newData
      });
      stub = sinon.stub(Invoice, "create").returns(stubValue);
      const result = await newInvoice(req, res);
      var body = result._getData();
      body.should.be.a("object");
      body.should.have.status("failure");
      body.should.have.property("code").eql(500);
      body.should.have.property("message").eql("Internal server error");
      stub.restore()
    });
    it("It should create New Invoice", async function () {
      req = mocks.createRequest({
        params: {
          id: stubValue._id,
        },
        body: newData
      });
      stub = sinon.stub(Invoice, "create").returns(stubValue);
      const stub2 = sinon.stub(Invoice,"findOne").returns({
        populate: sinon.stub().returns(stubValue)
      })
      const emailStub = sinon.stub(templateModel,"findOne").returns(emailValue)
      const result = await newInvoice(req, res);
      var body = result._getData();
      body.should.be.a("object");
      body.should.have.status("success");
      body.should.have.property("code").eql(200);
      body.data.should.have.property("PO_Id").eql(stubValue.PO_Id);
      body.data.should.have
        .property("client_sponsor")
        .eql(stubValue.client_sponsor);
      body.data.should.have
        .property("client_finance_controller")
        .eql(stubValue.client_finance_controller);
      body.data.should.have
        .property("invoice_raised")
        .eql(stubValue.invoice_raised);
      body.data.should.have
        .property("invoice_amount_received")
        .eql(stubValue.invoice_amount_received);
      body.data.should.have
        .property("vb_bank_account")
        .eql(stubValue.vb_bank_account);
      body.data.should.have
        .property("amount_received_on")
        .eql(stubValue.amount_received_on);
      body.data.should.have.property("_id").eql(stubValue._id);

      stub.restore();
      stub2.restore();
      emailStub.restore()
    });
    after(() => {});
  });
});
