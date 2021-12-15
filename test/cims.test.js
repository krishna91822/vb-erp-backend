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
        it("It should return Data fetched successfully", (done) => {
            chai
                .request(server)
                .get("/cims")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.data.should.be.a("array");
                    res.body.data.data.length.should.be.eql(5);
                    res.body.should.have.property("message").eq("Data fetched successfully");
                    done();
                })
        })
    })

    describe("/Post new CIMS record", () => {
        
        it("It should send Data created successfully", (done) => {
            let data = new compModal({
                registeredAddress: {
                    addressLine1: "#1",
                    addressLine2: "",
                    pincode: "560102",
                    country: "India-in",
                    state: "Karnataka",
                    district: "Bengaluru",
                    city: "HSR Layout",
                    landmark: ""
                },
                communicationAddress: {
                    addressLine1: "#1",
                    addressLine2: "",
                    pincode: "560102",
                    country: "India-in",
                    state: "Karnataka",
                    district: "Bengaluru",
                    city: "HSR Layout",
                    landmark: ""
                },
                status: 1,
                designation: "infote",
                brandName: "NewBrandName",
                domain: "Education",
                baseLocation: "Bangalore",
                gstNumber: "",
                panNumber: "AAAAA5555A",
                companyType: "GST Unregistered",
                contacts: {
                    primaryContact: {
                        title: "Manager",
                        firstName: "Ram",
                        lastName: "G",
                        email: "ram@myedutech.in",
                        contactNumber: "999911111",
                        otherContactNumber: ""
                    },
                    secondaryContact: {
                        title: "CEO",
                        firstName: "Jai",
                        lastName: "K",
                        email: "jai@myedutech.in",
                        contactNumber: "919696969696",
                        otherContactNumber: ""
                    },
                    tertiaryContact: {
                        title: "",
                        firstName: "",
                        lastName: "",
                        email: "",
                        contactNumber: "",
                        otherContactNumber: ""
                    }
                }
            });
            chai
                .request(server)
                .post("/cims")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property('message').eq("Data created successfully")
                    done();
                });
        });

        it("It should send Invalid request data", (done) => {
            let data = new compModal({
                registeredAddress: {
                    addressLine1: "#1",
                    addressLine2: "",
                    pincode: "560102",
                    country: "India-in",
                    state: "Karnataka",
                    district: "Bengaluru",
                    city: "HSR Layout",
                    landmark: ""
                },
                communicationAddress: {
                    addressLine1: "#1",
                    addressLine2: "",
                    pincode: "560102",
                    country: "India-in",
                    state: "Karnataka",
                    district: "Bengaluru",
                    city: "HSR Layout",
                    landmark: ""
                },
                status: 1,
                designation: "infote",
                domain: "Education",
                baseLocation: "Bangalore",
                gstNumber: "",
                panNumber: "AAAAA5555A",
                companyType: "GST Unregistered",
                contacts: {
                    primaryContact: {
                        title: "Manager",
                        firstName: "Ram",
                        lastName: "G",
                        email: "ram@myedutech.in",
                        contactNumber: "999911111",
                        otherContactNumber: ""
                    },
                    secondaryContact: {
                        title: "CEO",
                        firstName: "Jai",
                        lastName: "K",
                        email: "jai@myedutech.in",
                        contactNumber: "919696969696",
                        otherContactNumber: ""
                    },
                    tertiaryContact: {
                        title: "",
                        firstName: "",
                        lastName: "",
                        email: "",
                        contactNumber: "",
                        otherContactNumber: ""
                    }
                }
            });
            chai
                .request(server)
                .post("/cims")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property('code').eq(422)
                    res.body.should.have.property('message').eq("Invalid request data")
                    done();
                });
        });
    })

    describe("/SetStatus should Deactivate or Reactivate a CIMS record", () => {

        it("It should send The client Kyoto has been Reactivated", (done) => {

            const status = 0
            const _id = "61b0353611630d1a129ffee4"
            const brandName = "Kyoto"

            chai
                .request(server)
                .patch("/cims/status?id=" + _id + "&status=" + status + "&brandName=" + brandName)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('The client Kyoto has been Reactivated')
                    done();
                })
        })

        it("It should send The client Kyoto has been Deactivated", (done) => {

            const status = 1
            const _id = "61b0353611630d1a129ffee4"
            const brandName = "Kyoto"

            chai
                .request(server)
                .patch("/cims/status?id=" + _id + "&status=" + status + "&brandName=" + brandName)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('The client Kyoto has been Deactivated')
                    done();
                })
        })
    })

    describe("/Update a CIMS record", () => {
        it("It should update the values of a CIMS record", (done) => {

            let recordupdate = new compModal({
                registeredAddress: {
                    addressLine1: "#1",
                    addressLine2: "",
                    pincode: "560102",
                    country: "India-in",
                    state: "Karnataka",
                    district: "Bengaluru",
                    city: "HSR Layout",
                    landmark: ""
                },
                communicationAddress: {
                    addressLine1: "#1",
                    addressLine2: "",
                    pincode: "560102",
                    country: "India-in",
                    state: "Karnataka",
                    district: "Bengaluru",
                    city: "HSR Layout",
                    landmark: ""
                },
                status: 0,
                _id: "61b0353611630d1a129ffee4",
                designation: "infote",
                brandName: "Kyoto",
                domain: "Information Technology",
                baseLocation: "Bangalore",
                gstNumber: "",
                panNumber: "AAAAA5555A",
                companyType: "GST Unregistered",
                contacts: {
                    primaryContact: {
                        title: "Manager",
                        firstName: "Ram",
                        lastName: "G",
                        email: "ram@myedutech.in",
                        contactNumber: "999911111",
                        otherContactNumber: ""
                    },
                    secondaryContact: {
                        title: "CEO",
                        firstName: "Jai",
                        lastName: "K",
                        email: "jai@myedutech.in",
                        contactNumber: "919696969696",
                        otherContactNumber: ""
                    },
                    tertiaryContact: {
                        title: "",
                        firstName: "",
                        lastName: "",
                        email: "",
                        contactNumber: "",
                        otherContactNumber: ""
                    }
                }
            });
            chai
                .request(server)
                .patch("/cims")
                .send(recordupdate)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.have.property('domain').eql('Information Technology')
                    res.body.should.have.property('message').eql('Data updated successfully')
                    done();
                })
        })
    })

    describe("/Get location API should send State, Districts and Postal locations accoring to the Pincode and Country passed", () => {

        it("It should send Data fetched successfully", (done) => {
            chai
                .request(server)
                .get("/location")
                .set({
                    "pincode": 110093,
                    "country": "in"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("message").eq("Data fetched successfully")
                    done();
                })
        })

        it("It should send Invalid request data", (done) => {
            chai
                .request(server)
                .get("/location")
                .set({
                    "pincode": "",
                    "country": "in"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("code").eq(422)
                    res.body.should.have.property("message").eq("Invalid request data")
                    done();
                })
        })

        it("It should send the pincode doesnt exist", (done) => {
            chai
                .request(server)
                .get("/location")
                .set({
                    "pincode": 1100932,
                    "country": "in"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("code").eq(422)
                    res.body.should.have.property("message").eq("The pincode doesnt exist")
                    done();
                })
        })
    })

    describe("/Get Countries should send names of Countries for the Frontend dropdown", () => {

        it("It should send Data fetched successfully", (done) => {
            chai
                .request(server)
                .get("/countries")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("message").eq("Data fetched successfully")
                    done();
                })
        })
    })

    describe("/Get client should send record based on id", () => {

        it("It should send Data fetched successfully", (done) => {

            chai
                .request(server)
                .get("/getclientinfo")
                .set({
                    "id": "61b0353611630d1a129ffee4"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("message").eql("Data fetched successfully")
                    res.body.data[0].should.have.property("brandName").eq("Kyoto")
                    done();
                })
        })

        it("It should send No record with this id found", (done) => {

            chai
                .request(server)
                .get("/getclientinfo")
                .set({
                    "id": "61b0353611630d1a129ffee4s"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("code").eql(422)
                    res.body.should.have.property("message").eql("No record with this id found")
                    done();
                })
        })
    })

    describe("/Get request to check duplicates in the database", () => {

        it("It should send Data with this Brandname already exists", (done) => {

            chai
                .request(server)
                .get("/duplicates")
                .set({
                    "brandname": "kyoto"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("code").eq(422);
                    res.body.should.have.property("message").eq("Data with this brand name aready exists");
                    done();

                })
        })

        it("It should send Data is unique", (done) => {

            chai
                .request(server)
                .get("/duplicates")
                .set({
                    "brandname": "some random brandname"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("code").eq(200);
                    res.body.should.have.property("message").eq("Data is unique");
                    done();

                })
        })
    })
})
