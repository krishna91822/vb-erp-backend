process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/app");
let should = chai.should();
chai.use(chaiHttp);
require("dotenv").config();

let compModal = require("../src/models/compSchema");

describe("CIMS unit testing with Mocha..!!", () => {
  describe("/Get all the CIMS records", () => {
    it("It should return first 5 CIMS records", (done) => {
      chai
        .request(server)
        .get("/cims")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.data.should.be.a("array");
          res.body.data.data.length.should.be.eql(5);
          done();
        });
    });
  });
  describe("/Post new CIMS record", () => {
    it("It should post the data", (done) => {
      let data = new compModal({
        registeredAddress: {
          addressLine1: "#1",
          addressLine2: "",
          pincode: "560102",
          country: "India-in",
          state: "Karnataka",
          district: "Bengaluru",
          area: "HSR Layout",
          landmark: "",
        },
        communicationAddress: {
          addressLine1: "#1",
          addressLine2: "",
          pincode: "560102",
          country: "India-in",
          state: "Karnataka",
          district: "Bengaluru",
          area: "HSR Layout",
          landmark: "",
        },
        status: 1,
        _id: "61b0353611630d1a129ffee4",
        legalName: "infote",
        brandName: "Kyoto",
        domain: "Education",
        baseLocation: "Bangalore",
        gstNumber: "",
        panNumber: "AAAAA5555A",
        companyType: "GST Unregistered",
        contacts: {
          primaryContact: {
            designation: "Manager",
            firstName: "Ram",
            lastName: "G",
            email: "ram@myedutech.in",
            contactNumber: "999911111",
            otherContactNumber: "",
          },
          secondaryContact: {
            designation: "CEO",
            firstName: "Jai",
            lastName: "K",
            email: "jai@myedutech.in",
            contactNumber: "919696969696",
            otherContactNumber: "",
          },
          tertiaryContact: {
            designation: "",
            firstName: "",
            lastName: "",
            email: "",
            contactNumber: "",
            otherContactNumber: "",
          },
        },
      });
      chai
        .request(server)
        .post("/cims")
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");

          done();
        });
    });
  });
  describe("/SetStatus a CIMS record", () => {
    it("It should set the status to 0/1", (done) => {
      let record = new compModal({
        registeredAddress: {
          addressLine1: "#1",
          addressLine2: "",
          pincode: "560102",
          country: "India-in",
          state: "Karnataka",
          district: "Bengaluru",
          area: "HSR Layout",
          landmark: "",
        },
        communicationAddress: {
          addressLine1: "#1",
          addressLine2: "",
          pincode: "560102",
          country: "India-in",
          state: "Karnataka",
          district: "Bengaluru",
          area: "HSR Layout",
          landmark: "",
        },
        status: 0,
        _id: "61b0353611630d1a129ffee4",
        legalName: "infote",
        brandName: "Kyoto",
        domain: "Education",
        baseLocation: "Bangalore",
        gstNumber: "",
        panNumber: "AAAAA5555A",
        companyType: "GST Unregistered",
        contacts: {
          primaryContact: {
            designation: "Manager",
            firstName: "Ram",
            lastName: "G",
            email: "ram@myedutech.in",
            contactNumber: "999911111",
            otherContactNumber: "",
          },
          secondaryContact: {
            designation: "CEO",
            firstName: "Jai",
            lastName: "K",
            email: "jai@myedutech.in",
            contactNumber: "919696969696",
            otherContactNumber: "",
          },
          tertiaryContact: {
            designation: "",
            firstName: "",
            lastName: "",
            email: "",
            contactNumber: "",
            otherContactNumber: "",
          },
        },
      });
      record.save((err, data) => {
        chai
          .request(server)
          .patch(
            "/cims/status?clientId=" +
              record._id +
              "&clientStatus=" +
              record.status +
              "&brandName=" +
              record.brandName
          )
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have
              .property("message")
              .eql("The client Kyoto has been Reactivated");
            done();
          });
      });
    });
  });
  describe("/Update a CIMS record", () => {
    it("It should update the values of a CIMS record", (done) => {
      let record = new compModal({
        registeredAddress: {
          addressLine1: "#1",
          addressLine2: "",
          pincode: "560102",
          country: "India-in",
          state: "Karnataka",
          district: "Bengaluru",
          area: "HSR Layout",
          landmark: "",
        },
        communicationAddress: {
          addressLine1: "#1",
          addressLine2: "",
          pincode: "560102",
          country: "India-in",
          state: "Karnataka",
          district: "Bengaluru",
          area: "HSR Layout",
          landmark: "",
        },
        status: 0,
        _id: "61b0353611630d1a129ffee4",
        legalName: "infote",
        brandName: "Kyoto",
        domain: "Education",
        baseLocation: "Bangalore",
        gstNumber: "",
        panNumber: "AAAAA5555A",
        companyType: "GST Unregistered",
        contacts: {
          primaryContact: {
            designation: "Manager",
            firstName: "Ram",
            lastName: "G",
            email: "ram@myedutech.in",
            contactNumber: "999911111",
            otherContactNumber: "",
          },
          secondaryContact: {
            designation: "CEO",
            firstName: "Jai",
            lastName: "K",
            email: "jai@myedutech.in",
            contactNumber: "919696969696",
            otherContactNumber: "",
          },
          tertiaryContact: {
            designation: "",
            firstName: "",
            lastName: "",
            email: "",
            contactNumber: "",
            otherContactNumber: "",
          },
        },
      });
      let recordupdate = new compModal({
        registeredAddress: {
          addressLine1: "#1",
          addressLine2: "",
          pincode: "560102",
          country: "India-in",
          state: "Karnataka",
          district: "Bengaluru",
          area: "HSR Layout",
          landmark: "",
        },
        communicationAddress: {
          addressLine1: "#1",
          addressLine2: "",
          pincode: "560102",
          country: "India-in",
          state: "Karnataka",
          district: "Bengaluru",
          area: "HSR Layout",
          landmark: "",
        },
        status: 0,
        _id: "61b0353611630d1a129ffee4",
        legalName: "infote",
        brandName: "Kyoto",
        domain: "Information Technology",
        baseLocation: "Bangalore",
        gstNumber: "",
        panNumber: "AAAAA5555A",
        companyType: "GST Unregistered",
        contacts: {
          primaryContact: {
            designation: "Manager",
            firstName: "Ram",
            lastName: "G",
            email: "ram@myedutech.in",
            contactNumber: "999911111",
            otherContactNumber: "",
          },
          secondaryContact: {
            designation: "CEO",
            firstName: "Jai",
            lastName: "K",
            email: "jai@myedutech.in",
            contactNumber: "919696969696",
            otherContactNumber: "",
          },
          tertiaryContact: {
            designation: "",
            firstName: "",
            lastName: "",
            email: "",
            contactNumber: "",
            otherContactNumber: "",
          },
        },
      });
      record.save((err, data) => {
        chai
          .request(server)
          .patch("/cims")
          .send(recordupdate)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.have
              .property("domain")
              .eql("Information Technology");
            done();
          });
      });
    });
  });
  describe("/Search for a CIMS record", () => {
    it("It should return data with the searched field", (done) => {
      let record = new compModal({
        registeredAddress: {
          addressLine1: "#1",
          addressLine2: "",
          pincode: "560102",
          country: "India-in",
          state: "Karnataka",
          district: "Bengaluru",
          area: "HSR Layout",
          landmark: "",
        },
        communicationAddress: {
          addressLine1: "#1",
          addressLine2: "",
          pincode: "560102",
          country: "India-in",
          state: "Karnataka",
          district: "Bengaluru",
          area: "HSR Layout",
          landmark: "",
        },
        status: 1,
        _id: "61b0353611630d1a129ffee4",
        legalName: "infote",
        brandName: "Kyoto",
        domain: "Education",
        baseLocation: "Bangalore",
        gstNumber: "",
        panNumber: "AAAAA5555A",
        companyType: "GST Unregistered",
        contacts: {
          primaryContact: {
            designation: "Manager",
            firstName: "Ram",
            lastName: "G",
            email: "ram@myedutech.in",
            contactNumber: "999911111",
            otherContactNumber: "",
          },
          secondaryContact: {
            designation: "CEO",
            firstName: "Jai",
            lastName: "K",
            email: "jai@myedutech.in",
            contactNumber: "919696969696",
            otherContactNumber: "",
          },
          tertiaryContact: {
            designation: "",
            firstName: "",
            lastName: "",
            email: "",
            contactNumber: "",
            otherContactNumber: "",
          },
        },
      });
      const searchData = "Kyoto";
      record.save((err, data) => {
        chai
          .request(server)
          .get("/cims/search?searchData=" + searchData)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("array");
            res.body.data[0].should.have.property("brandName").eq("Kyoto");

            done();
          });
      });
    });
    it("It should return data with the searched field", (done) => {
      let record = new compModal({
        registeredAddress: {
          addressLine1: "#1",
          addressLine2: "",
          pincode: "560102",
          country: "India-in",
          state: "Karnataka",
          district: "Bengaluru",
          area: "HSR Layout",
          landmark: "",
        },
        communicationAddress: {
          addressLine1: "#1",
          addressLine2: "",
          pincode: "560102",
          country: "India-in",
          state: "Karnataka",
          district: "Bengaluru",
          area: "HSR Layout",
          landmark: "",
        },
        status: 1,
        _id: "61b0353611630d1a129ffee4",
        legalName: "infote",
        brandName: "Kyoto",
        domain: "Education",
        baseLocation: "Bangalore",
        gstNumber: "",
        panNumber: "AAAAA5555A",
        companyType: "GST Unregistered",
        contacts: {
          primaryContact: {
            designation: "Manager",
            firstName: "Ram",
            lastName: "G",
            email: "ram@myedutech.in",
            contactNumber: "999911111",
            otherContactNumber: "",
          },
          secondaryContact: {
            designation: "CEO",
            firstName: "Jai",
            lastName: "K",
            email: "jai@myedutech.in",
            contactNumber: "919696969696",
            otherContactNumber: "",
          },
          tertiaryContact: {
            designation: "",
            firstName: "",
            lastName: "",
            email: "",
            contactNumber: "",
            otherContactNumber: "",
          },
        },
      });
      const searchData = "India-in";
      record.save((err, data) => {
        chai
          .request(server)
          .get("/cims/search?searchData=" + searchData)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("array");
            res.body.data[0].registeredAddress.should.have
              .property("country")
              .eq("India-in");

            done();
          });
      });
    });
    it("It should return data with the searched field", (done) => {
      let record = new compModal({
        registeredAddress: {
          addressLine1: "#1",
          addressLine2: "",
          pincode: "560102",
          country: "India-in",
          state: "Karnataka",
          district: "Bengaluru",
          area: "HSR Layout",
          landmark: "",
        },
        communicationAddress: {
          addressLine1: "#1",
          addressLine2: "",
          pincode: "560102",
          country: "India-in",
          state: "Karnataka",
          district: "Bengaluru",
          area: "HSR Layout",
          landmark: "",
        },
        status: 1,
        _id: "61b0353611630d1a129ffee4",
        legalName: "infote",
        brandName: "Kyoto",
        domain: "Education",
        baseLocation: "Bangalore",
        gstNumber: "",
        panNumber: "AAAAA5555A",
        companyType: "GST Unregistered",
        contacts: {
          primaryContact: {
            designation: "Manager",
            firstName: "Ram",
            lastName: "G",
            email: "ram@myedutech.in",
            contactNumber: "999911111",
            otherContactNumber: "",
          },
          secondaryContact: {
            designation: "CEO",
            firstName: "Jai",
            lastName: "K",
            email: "jai@myedutech.in",
            contactNumber: "919696969696",
            otherContactNumber: "",
          },
          tertiaryContact: {
            designation: "",
            firstName: "",
            lastName: "",
            email: "",
            contactNumber: "",
            otherContactNumber: "",
          },
        },
      });
      const searchData = "Ram";
      record.save((err, data) => {
        chai
          .request(server)
          .get("/cims/search?searchData=" + searchData)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("array");
            res.body.data[0].contacts.primaryContact.should.have
              .property("firstName")
              .eq("Ram");

            done();
          });
      });
    });
  });
});
