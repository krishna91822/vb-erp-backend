process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/app");
let should = chai.should;
chai.use(chaiHttp);
let invoice = require("../src/models/invoicemodel");

describe("Invoice Unit Testing with Mocha..!!", () => {
  describe("get invoice by id", () => {
    it("it should GET a Invoice by given id", (done) => {
      let details = {
        PO_Id: "61aee1b97af12a205c1a16c5",
        client_sponsor: "shivam",
        client_finance_controller: "xyz",
        invoice_raised: "huirvkhio",
        invoice_amount_received: 5689339,
        vb_bank_account: "dwrjhgcriwog",
        amount_received_on: "2014-01-22T14:56:59.301Z",
      };
      const invoiveDetails = new invoice(details);
      invoiveDetails.save((err, data) => {
        chai
          .request(server)
          .get("/invoice/" + invoiveDetails.id)
          .send(invoiveDetails)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.data.should.have.property("PO_Id").be.a("object");
            res.body.data.should.have.property("client_sponsor");
            res.body.data.should.have.property("client_finance_controller");
            res.body.data.should.have.property("invoice_raised");
            res.body.data.should.have.property("invoice_amount_received");
            res.body.data.should.have.property("vb_bank_account");
            res.body.data.should.have.property("amount_received_on");
            res.body.data.should.have.property("_id").eql(invoiveDetails.id);
            done();
          });
      });
    });

    it("it should throw an exception", (done) => {
      let details = {
        PO_Id: "61aee1b97af12a205c1a16c5",
        client_sponsor: "shivam",
        client_finance_controller: "xyz",
        invoice_raised: "huirvkhio",
        invoice_amount_received: 5689339,
        vb_bank_account: "dwrjhgcriwog",
        amount_received_on: "2014-01-22T14:56:59.301Z",
      };
      const invoiveDetails = new invoice(details);
      const id = "61aee1b97af12a205c1a16z5";
      invoiveDetails.save((err, data) => {
        chai
          .request(server)
          .get("/invoice/" + id)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.have
              .property("message")
              .eql("Internal server error");
            res.body.should.have.property("error");
            done();
          });
      });
    });
  });

  describe("get Invoice", () => {
    it("it should sort the Invoice based on given field", (done) => {
      chai
        .request(server)
        .get("/invoice/sort/Id")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
    it("it should not sort the Invoice based on given field", (done) => {
      chai
        .request(server)
        .get("/invoice/sort/rjfhjvhk")
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have
            .property("message")
            .eql("something went wrong!!");
          res.body.should.have.property("error");
          done();
        });
    });
  });

  describe("/POST Invoice", () => {
    it("it should throw validation error", (done) => {
      let invoice = {
        client_sponsor: "qqqqqqqqqqq",
        client_finance_controller: "qq",
        invoice_raised: "qq",
        invoice_amount_received: "343434343",
      };
      chai
        .request(server)
        .post("/invoice")
        .send(invoice)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          done();
        });
    });
    it("it should POST a Invoice", (done) => {
      let invoice = {
        PO_Id: "61aee1e37af12a205c1a16c7",
        client_sponsor: "qqqqqqqqqqq",
        client_finance_controller: "qq",
        invoice_raised: "qq",
        invoice_amount_received: "343434343",
      };
      chai
        .request(server)
        .post("/invoice")
        .send(invoice)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
