// process.env.NODE_ENV = "test";

// let chai = require("chai");
// let chaiHttp = require("chai-http");
// let server = require("../src/app");
// let should = chai.should();
// chai.use(chaiHttp);

// let poSow = require("../src/models/poSow");

describe("PO/SOW Unit Testing with Mocha..!!", () => {
  describe("/Create new PO/SOW", () => {
    it("it should throw validation error", (done) => {
      let data = new poSow({
        Client_Sponser: ["ABD", "DEF"],
        Client_Finance_Controller: ["VMN", "QWE"],
        Targetted_Resources: ["WSJ", "GHJ"],
        Status: "Drafted",
        Type: "PO",
        PO_Number: "ERP34",
        PO_Amount: 3434,
        Currency: "USD",
        Document_Name: "VB_ERP",
        Document_Type: "pdf",
        Remarks: "Created New PO",
      });
      chai
        .request(server)
        .post("/poSow")
        .send(data)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          done();
        });
    });
    it("it should create new PO", (done) => {
      let details = {
        Client_Name: "Valuebound Solutions",
        Project_Name: "ERP System",
        Client_Sponser: ["ABD", "DEF"],
        Client_Finance_Controller: ["VMN", "QWE"],
        Targetted_Resources: ["WSJ", "GHJ"],
        Status: "Drafted",
        Type: "PO",
        PO_Number: "ERP34",
        PO_Amount: 3434,
        Currency: "USD",
        Document_Name: "VB_ERP",
        Document_Type: "pdf",
        Remarks: "Created New PO",
      };
      const poDetails = new poSow(details);
      poDetails.save((err, data) => {
        chai
          .request(server)
          .post("/poSow")
          .send(details)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("Client_Name");
            res.body.should.have.property("Project_Name");
            res.body.should.have.property("Client_Sponser");
            res.body.should.have.property("Client_Finance_Controller");
            res.body.should.have.property("Targetted_Resources");
            res.body.should.have.property("Status");
            res.body.should.have.property("Type");
            res.body.should.have.property("PO_Number");
            res.body.should.have.property("PO_Amount");
            res.body.should.have.property("Currency");
            res.body.should.have.property("Document_Name");
            res.body.should.have.property("Document_Type");
            res.body.should.have.property("Remarks");
            done();
          });
      });
    });
  });

  describe("/update PO/SOW details", () => {
    it("it should throw validation error", (done) => {
      const details = new poSow({
        id: "45hf873f748",
        Client_Sponser: ["ABD", "DEF"],
        Client_Finance_Controller: ["VMN", "QWE"],
        Targetted_Resources: ["WSJ", "GHJ"],
        Status: "Drafted",
        Type: "PO",
        PO_Number: "ERP34",
        PO_Amount: "vhinuhg",
        Currency: "USD",
        Document_Name: "VB_ERP",
        Document_Type: "pdf",
        Remarks: "Created New PO",
      });
      chai
        .request(server)
        .patch("/poSow/" + details.id)
        .send({
          Client_Sponser: ["xyz"],
          Client_Finance_Controller: ["VMN", "QWE"],
          Targetted_Resources: ["WSJ", "GHJ"],
          Status: "Drafted",
          Type: "SOW",
          PO_Number: "ERP43",
          PO_Amount: "vhinuhg",
          Currency: "INR",
          Document_Name: "VB_ERP_Backend",
          Document_Type: "pdf",
          Remarks: "Created New PO",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          done();
        });
    });

    describe("/GET PO/SOW", () => {
        it("it should throw Query validation error", (done) => {
            chai
                .request(server)
                .get("/poSow")
                .query({
                    page: -1,
                    limit: 0
                })
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a("object");
                    res.body.should.have.property("error");
                    done();
                });
        });

        it("it should GET all the PO/SOW", (done) => {
            chai
                .request(server)
                .get("/poSow")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.results.should.be.a("array");
                    res.body.data.results.length.should.be.above(0);
                    done();
                });
        });
    });

    describe("/GET/sort/fieldName PO/SOW",() => {
        it("it should throw Query validation error", (done) => {
            chai
                .request(server)
                .get("/poSow/sort/Client_Name")
                .query({
                    page: -1,
                    limit: 0
                })
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a("object");
                    res.body.should.have.property("error");
                    done();
                });
        });
        it("it should SORT the list based on given field", (done) => {
            chai
                .request(server)
                .get("/poSow/sort/Client_Name")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.results.should.be.a("array");
                    res.body.data.results.length.should.be.above(0);
                    done();
                });
        });
    })

    describe("/GET/:id PO/SOW", () => {
        it("it should GET a PO/SOW by given id", (done) => {
            let details = {
                Client_Name: "Valuebound Solutions",
                Project_Name: "ERP System",
                Client_Sponser: ["ABD", "DEF"],
                Client_Finance_Controller: ["VMN", "QWE"],
                Targetted_Resources: ["WSJ", "GHJ"],
                Status: "Drafted",
                Type: "PO",
                PO_Number: "ERP34",
                PO_Amount: 3434,
                Currency: "USD",
                Document_Name: "VB_ERP",
                Document_Type: "pdf",
                Remarks: "Created New PO"
            };
            const poDetails = new poSow(details)
            poDetails.save((err, data) => {
                chai
                    .request(server)
                    .get("/poSow/" + poDetails.id)
                    .send(details)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a("object");
                        res.body.data.should.have.property("Client_Name");
                        res.body.data.should.have.property("Project_Name");
                        res.body.data.should.have.property("Client_Sponser");
                        res.body.data.should.have.property("Client_Finance_Controller");
                        res.body.data.should.have.property("Targetted_Resources");
                        res.body.data.should.have.property("Status");
                        res.body.data.should.have.property("Type");
                        res.body.data.should.have.property("PO_Number");
                        res.body.data.should.have.property("PO_Amount");
                        res.body.data.should.have.property("Currency");
                        res.body.data.should.have.property("Document_Name");
                        res.body.data.should.have.property("Document_Type");
                        res.body.data.should.have.property("Remarks");
                        res.body.data.should.have.property("_id").eql(poDetails.id);
                        done();
                    });
            });
        });
    });
})
    it("it should update PO details", (done) => {
      const details = {
        id: "45hf873f748",
        Client_Name: "Valuebound Solutions",
        Project_Name: "ERP System",
        Client_Sponser: ["ABD", "DEF"],
        Client_Finance_Controller: ["VMN", "QWE"],
        Targetted_Resources: ["WSJ", "GHJ"],
        Status: "Drafted",
        Type: "PO",
        PO_Number: "ERP34",
        PO_Amount: 3434,
        Currency: "USD",
        Document_Name: "VB_ERP",
        Document_Type: "pdf",
        Remarks: "Created New PO",
      };
      const poDetails = new poSow(details);
      poDetails.save((err, data) => {
        chai
          .request(server)
          .patch("/poSow" + details.id)
          .send({
            Client_Name: "tcs Solutions",
            Project_Name: "ERP System backend",
            Client_Sponser: ["ABD"],
            Client_Finance_Controller: ["VMN", "QWE"],
            Targetted_Resources: ["WSJ", "GHJ"],
            Status: "Drafted",
            Type: "SOW",
            PO_Number: "ERP43",
            PO_Amount: 3434,
            Currency: "INR",
            Document_Name: "VB_ERP_Backend",
            Document_Type: "pdf",
            Remarks: "Created New PO",
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });
  });

  describe("/update PO/SOW status", () => {
    it("it should update PO status", (done) => {
      const details = {
        Client_Name: "Valuebound Solutions",
        Project_Name: "ERP System",
        Client_Sponser: ["ABD", "DEF"],
        Client_Finance_Controller: ["VMN", "QWE"],
        Targetted_Resources: ["WSJ", "GHJ"],
        Status: "Drafted",
        Type: "PO",
        PO_Number: "ERP34",
        PO_Amount: 3434,
        Currency: "USD",
        Document_Name: "VB_ERP",
        Document_Type: "pdf",
        Remarks: "Created New PO",
      };
      const poDetails = new poSow(details);
      poDetails.save((err, data) => {
        chai
          .request(server)
          .patch("/poSow/status/" + poDetails.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have
              .property("message")
              .eql("status updated successfully");
            done();
          });
      });
    });

    it("already updated PO status", (done) => {
      const details = {
        Client_Name: "Valuebound Solutions",
        Project_Name: "ERP System",
        Client_Sponser: ["ABD", "DEF"],
        Client_Finance_Controller: ["VMN", "QWE"],
        Targetted_Resources: ["WSJ", "GHJ"],
        Status: "Pending",
        Type: "PO",
        PO_Number: "ERP34",
        PO_Amount: 3434,
        Currency: "USD",
        Document_Name: "VB_ERP",
        Document_Type: "pdf",
        Remarks: "Created New PO",
      };
      const poDetails = new poSow(details);
      poDetails.save((err, data) => {
        chai
          .request(server)
          .patch("/poSow/status/" + poDetails.id)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have
              .property("message")
              .eql("status already updated");
            done();
          });
      });
    });
  });
