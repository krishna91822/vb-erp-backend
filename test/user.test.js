process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/app");
let should = chai.should();
chai.use(chaiHttp);

let User = require("../src/models/user");
let id=[]

describe("User function unit testing with mocha ... ", () => {
  after("its execute after all test cases and delete all user",(done)=>{
    User.deleteMany({first_name:"test"}).exec()
    done();
  })
  describe("/POST User", () => {
    it("it should throw validation error", (done) => {
      let user = {
        first_name: "test",
        last_name: "Kumar",
        role: "admin",
      };
      chai
        .request(server)
        .post("/users")
        .send(user)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          done();
        });
    });
    it("it should POST a user", (done) => {
      let user = {
        first_name: "test",
        last_name: "Kumar",
        email: "akashg@gmail.com",
        role: "admin",
        password:"anything"
      };
      chai
        .request(server)
        .post("/users")
        .send(user)
        .end((err, res) => {
          id.push(res.body.data._id)
          res.should.have.status(201);
          res.body.should.be.a("object");
          done();
        });
    });
  });
  describe("/GET Users", () => {
    it("it should GET all the users", (done) => {
      chai
        .request(server)
        .get("/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.results.should.be.a("array");
          res.body.data.results.length.should.be.above(0);
          done();
        });
    });
  });

  describe("/GET/:id User", () => {
    it("it should GET a user by the given id", (done) => {
      let user = new User({
        first_name: "test",
        last_name: "Kumar",
        email: "akash1@gmail.com",
        role: "admin",
        password:"kalpanik"
      });
      user.save((err, user) => {
        chai
          .request(server)
          .get("/users/" + user.id)
          .send(user)
          .end((err, res) => {
            id.push(user.id)
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.data.should.have.property("first_name");
            res.body.data.should.have.property("email");
            res.body.data.should.have.property("role");
            res.body.data.should.have.property("_id").eql(user.id);
            done();
          });
      });
    });
  });
  describe("/PUT/:id User", () => {
    it("it should UPDATE a user given the id", (done) => {
      let user = new User({
        first_name: "test",
        last_name: "Kumar",
        email: "amit3@gmail.com",
        role: "staff",
        password:"some"
      });
      user.save((err, user) => {
        chai
          .request(server)
          .put("/users/" + user.id)
          .send({
            first_name: "test",
            last_name: "sinha",
            email: "amit@gmail.com",
            role: "admin",
          })
          .end((err, res) => {
            id.push(user.id)
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("user successfully updated!");
            res.body.data.should.have.property("role").eql("admin");
            done();
          });
      });
    });
  });
  /*
   * Test the /DELETE/:id route
   */
  describe("/DELETE/:id user", () => {
    it("it should DELETE a user given the id", (done) => {
      let user = new User({
        first_name: "test",
        last_name: "Kumar",
        email: "amit3@gmail.com",
        role: "staff",
        password:"somes"
      });
      user.save((err, user) => {
        chai
          .request(server)
          .delete("/users/" + user.id)
          .end((err, res) => {
            id.push(user.id)
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("user successfully deleted!");
            res.body.should.have.property("data");
            done();
          });
      });
    });
  });
});
