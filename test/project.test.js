const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const app = require("../src/app");
const projects = require("../src/models/projectsModel");

chai.use(chaiHttp);

describe("PMO Projects Unit Testing with Mocha..!!", () => {
  //testing for POST request
  describe("POST /projects", () => {
    it("Returns status(201)", (done) => {
      let project = {
        clientId: "vb-cl-01",
        clientName: "Atif Kamal",
        projectName: "PMO-1",
        clientProjectManager: "M1",
        startDate: "2021-11-20",
        endDate: "2021-11-28",
        clientProjectSponsor: "cS-1",
        clientFinanceController: "cF-1",
        clientPrimaryContact: 1234567890,
        vbProjectManager: "VB-Mn",
        domainSector: "Backend APIs",
        vbProjectStatus: "Active",
      };
      chai
        .request(app)
        .post("/projects")
        .send(project)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("clientName");
          res.body.should.have.property("projectName");
          res.body.should.have.property("clientProjectManager");
          res.body.should.have.property("startDate");
          res.body.should.have.property("endDate");
          res.body.should.have.property("clientProjectSponsor");
          res.body.should.have.property("clientFinanceController");
          res.body.should.have.property("clientPrimaryContact");
          res.body.should.have.property("domainSector");
          res.body.should.have.property("vbProjectStatus");
          res.body.should.have.property("vbProjectManager");
          done();
        });
    });
  });

  // testing for GET active projects request
  describe("GET /projects/active", () => {
    it("Returns status(200)", (done) => {
      chai
        .request(app)
        .get("/projects/active/")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  // testing for GET active project filtering by any field
  describe("GET /projects/active?fieldName={query}", () => {
    it("Returns status(200)", (done) => {
      chai
        .request(app)
        .get("/projects/active?clientName=Atif")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  // testing for GET active sorted project by any field
  describe("GET /projects/active/:{fieldName}", () => {
    it("Returns status(200)", (done) => {
      chai
        .request(app)
        .get("/projects/active/clientName")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  // testing for GET done projects request
  describe("GET /projects/done", () => {
    it("Returns status(200)", (done) => {
      chai
        .request(app)
        .get("/projects/active")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  // testing for GET done project filtering by any field
  describe("GET /projects/active?fieldName={query}", () => {
    it("Returns status(200)", (done) => {
      chai
        .request(app)
        .get("/projects/active?clientName=Atif")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  // testing for GET done sorted project by any field
  describe("GET /projects/done/:{fieldName}", () => {
    it("Returns status(200)", (done) => {
      chai
        .request(app)
        .get("/projects/done/clientName")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  //Testing for Update by ID
  describe("PUT /projects/:id", () => {
    it("it should UPDATE a resources given the id", (done) => {
      let project = new projects({
        clientId: "vb-cl-01",
        clientName: "Atif Kamal",
        projectName: "PMO-1",
        clientProjectManager: "M1",
        startDate: "2021-11-20",
        endDate: "2021-11-28",
        clientProjectSponsor: "cS-1",
        clientFinanceController: "cF-1",
        clientPrimaryContact: 1234567890,
        vbProjectManager: "VB-Mn",
        domainSector: "Backend APIs",
        vbProjectStatus: "Active",
      });
      project.save((err, project) => {
        chai
          .request(app)
          .put("/projects/" + project.id)
          .send({
            clientId: "vb-cl-01",
            clientName: "Atif Kamal",
            projectName: "PMO-1",
            clientProjectManager: "M1",
            startDate: "2021-11-20",
            endDate: "2021-11-28",
            clientProjectSponsor: "cS-1",
            clientFinanceController: "cF-1",
            clientPrimaryContact: 1234567890,
            vbProjectManager: "VB-Mn",
            domainSector: "Backend APIs",
            vbProjectStatus: "Done",
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });
  });
});
