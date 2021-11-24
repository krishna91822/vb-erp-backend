const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const app = require("../src/app");
const projects = require("../src/models/projectsModel");

chai.use(chaiHttp);

//testing for POST request
describe("POST /projects", () => {
    // it('it will not POST in projects as one of the field name (projectName) is not given', (done) => {
    //     let project = {
    //         clientName: "Atif Kamal",
    //         clientProjectManager: "M1",
    //         startDate: "2021-11-20",
    //         endDate: "2021-11-28",
    //         contractUniqueID: "cnID",
    //         clientProjectSponser: "cS-1",
    //         clientFinanceController: "cF-1",
    //         clientPrimaryContact: 1234567890,
    //         domainSector: "Backend APIs",
    //         vbProjectStatus: "active",
    //         vbProjectManager: "VB-Mn"
    //     }
    //     chai.request(app)
    //         .post('/projects')
    //         .send(project)
    //         .end((err, res) => {
    //             res.should.have.status(400);
    //             res.body.should.have.property('errors');
    //             res.body.errors.should.have.property('projectName');
    //             res.body.errors.projectName.should.have.property('kind').eql('required');
    //             done();
    //         });
    // });

    it("Returns status(201)", (done) => {
        let project = {
            clientName: "Atif Kamal",
            projectName: "PMO-1",
            clientProjectManager: "M1",
            startDate: "2021-11-20",
            endDate: "2021-11-28",
            contractUniqueID: "cnID",
            clientProjectSponser: "cS-1",
            clientFinanceController: "cF-1",
            clientPrimaryContact: 1234567890,
            domainSector: "Backend APIs",
            vbProjectStatus: "active",
            vbProjectManager: "VB-Mn"
        }
        chai.request(app)
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
                res.body.should.have.property("contractUniqueID");
                res.body.should.have.property("clientProjectSponser");
                res.body.should.have.property("clientFinanceController");
                res.body.should.have.property("clientPrimaryContact");
                res.body.should.have.property("domainSector");
                res.body.should.have.property("vbProjectStatus");
                res.body.should.have.property("vbProjectManager");
                done();
            });
    });
});

// testing for GET request
describe("GET /projects", () => {
    it("Returns status(200)", (done) => {
        chai.request(app)
            .get("/projects")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                done();
            });
    });
});

// testing for GET/:id request
describe("GET /projects/:id", () => {
    it("Returns status(200)", (done) => {
        let project = new projects({
            clientName: "Atif Kamal",
            projectName: "PMO-1",
            clientProjectManager: "M1",
            startDate: "2021-11-20",
            endDate: "2021-11-28",
            contractUniqueID: "cnID",
            clientProjectSponser: "cS-1",
            clientFinanceController: "cF-1",
            clientPrimaryContact: 1234567890,
            domainSector: "Backend APIs",
            vbProjectStatus: "active",
            vbProjectManager: "VB-Mn"
        });

        project.save((err, project) => {
            chai.request(app)
                .get("/projects/" + project.id)
                .send(project)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("clientName");
                    res.body.should.have.property("projectName");
                    res.body.should.have.property("clientProjectManager");
                    res.body.should.have.property("startDate");
                    res.body.should.have.property("endDate");
                    res.body.should.have.property("contractUniqueID");
                    res.body.should.have.property("clientProjectSponser");
                    res.body.should.have.property("clientFinanceController");
                    res.body.should.have.property("clientPrimaryContact");
                    res.body.should.have.property("domainSector");
                    res.body.should.have.property("vbProjectStatus");
                    res.body.should.have.property("vbProjectManager");
                    done();
                });
        });
    });
});

//Testing for Update by ID
describe("PUT /projects/:id", () => {
    it('it should UPDATE a resources given the id', (done) => {
        let project = new projects({
            clientName: "Atif Kamal",
            projectName: "PMO-1",
            clientProjectManager: "M1",
            startDate: "2021-11-20",
            endDate: "2021-11-28",
            contractUniqueID: "cnID",
            clientProjectSponser: "cS-1",
            clientFinanceController: "cF-1",
            clientPrimaryContact: 1234567890,
            domainSector: "Backend APIs",
            vbProjectStatus: "active",
            vbProjectManager: "VB-Mn"
        })
        project.save((err, project) => {
            chai.request(app)
                .put('/projects/' + project.id)
                .send({
                    clientName: "Saad Hasan",
                    projectName: "PMO-1",
                    clientProjectManager: "M1",
                    startDate: "2021-11-20",
                    endDate: "2021-11-28",
                    contractUniqueID: "cnID",
                    clientProjectSponser: "cS-1",
                    clientFinanceController: "cF-1",
                    clientPrimaryContact: 1234567890,
                    domainSector: "Backend APIs",
                    vbProjectStatus: "active",
                    vbProjectManager: "VB-Mn"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});