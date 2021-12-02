process.env.NODE_ENV = "test";

const chai = require('chai');
const chaiHttp = require('chai-http');
let server = require("../src/app");
chai.should();
chai.use(chaiHttp);

const data={
    "reward_display_name": "Reward new",
    "reward_type": "weekly",
    "reward_subType": "work-anniversary",
    "reward_sender": "manager",
    "reward_receiver": "manager",
    "receiver_message": "Congratulations",
    "announcement_type": "public",
    "slack_channel": "@slack.com",
    "channel_message": "channel message here"
}
let id;
let dummyreward;

describe('rewards apis', () => {
    
    describe('/POST Rewards', () => {
        it('it should post a reward ',(done)=>{
            chai.request(server)
            .post('/rewards')
            .send(data)
            .end((err,res)=>{
                id=res.body.data._id;
                dummyreward=res.body;
                res.should.have.status(201);
                res.body.should.be.a('object');
                done();
            });
        });
        it('it should throw validation error', (done) => {
            const reward = {
                reward_type: "weekly",
                reward_sender: "manager",
                reward_receiver: "manager",
                receiver_message: "ghgf",
                announcement_type: "public",
                slack_channel: "fdgfd",
                channel_message: "fgdfdh"
            }
            chai.request(server)
                .post('/rewards')
                .send(reward)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a("object");
                    res.body.should.have.property("error");
                    done();
                });
        });
    });

    describe('/GET rewards', () => {
        it('It should get all the rewards', (done) => {
            chai.request(server)
                .get('/rewards')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.results.should.be.a("array");
                    res.body.data.results.length.should.be.above(0);
                    done();
                });
        });
        it('It gives all rewards with sorting and filtering', (done)=>{
            chai.request(server)
            .get('/rewards')
            .query({page:"2",sortBy:"reward_type",sortOrder:"desc",status:"Launch",startdate:"2021-04-01",enddate:"2021-11-01"})
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data.should.have.property("currentPage").eq(2);
                res.body.data.results.should.be.a("array");
                done();
            });
        });
    });

    describe('/GET/:id rewards', () => {
        it('It should get a reward by the given id', (done) => {
            chai.request(server)
                .get('/rewards/'+id)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                    res.body.data.should.have.property('_id');
                    res.body.data.should.have.property('reward_display_name');
                    res.body.data.should.have.property('reward_type');
                    res.body.data.should.have.property('reward_sender');
                    res.body.data.should.have.property('reward_receiver');
                    res.body.data.should.have.property('receiver_message');
                    res.body.data.should.have.property('announcement_type');
                    res.body.data.should.have.property('slack_channel');
                    res.body.data.should.have.property('channel_message');
                    res.body.data.should.have.property('status');
                    res.body.data.should.have.property('createdAt');
                    res.body.data.should.have.property('updatedAt');
                    res.body.data.should.have.property('_id').eql(id);
                    done();
                });
        });
        it('It should not get the reward by the given id', (done) => {
            const id_num = id+1;
            chai.request(server)
                .get('/rewards/' +id_num)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a("object");
                res.body.should.have
                  .property("message")
                  .eql("Internal Server Error");
                    done();
                });
        });
        it('It should give Bad Request by the wrong given id', (done) => {
            const id_num="61a1d9751075ba088c43f562"
            chai.request(server)
                .get('/rewards/' +id_num)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                res.body.should.have
                  .property("message")
                  .eql("Bad Request");
                    done();
                });
        });
    });

const updateddata={
    "reward_display_name": "reward update",
    "reward_type": "yearly",
    "reward_sender": "manager",
    "reward_receiver": "manager",
    "receiver_message": "def",
    "announcement_type": "def",
    "slack_channel": "#birthday",
    "channel_message": "updated messsage"
};
    describe("/PUT/:id rewards",()=>{
        it("It should update/edit a rewards by the  id",(done)=>{
            chai.request(server)
            .put('/rewards/'+id)
            .send(updateddata)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have
                  .property("message")
                  .eql("rewards successfully updated!");
                done();
            });
        });

        it('it should not update/edit a rewards by the id',(done)=>{
            chai.request(server)
            .put('/rewards/'+id+'1')
            .send(updateddata)
            .end((err,res)=>{
                res.should.have.status(500);
                res.body.should.be.a("object");
                res.body.should.have
                  .property("message")
                  .eql("Internal server error");
                done();
            });   
        });
        it('It should give Bad Request by the wrong given id', (done) => {
            const id_num="61a1d9751075ba088c43f562"
            chai.request(server)
                .put('/rewards/' +id_num)
                .send(updateddata)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                res.body.should.have
                  .property("message")
                  .eql("Bad Request");
                    done();
                });
        });
    });

    describe('/PUT/launch/:id rewards', () => {
        it('It should launch a reward by the id',(done)=>{
            chai.request(server)
            .put('/rewards/launch/'+id)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have
                  .property("message")
                  .eql("Rewards are launch");
                done();
            });
        });

        it('It should return reward already launch for given id',(done)=>{
            chai.request(server)
            .put('/rewards/launch/'+id)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have
                  .property("message")
                  .eql("Rewards are already in launch state");
                done();
            });
        });

        it('it should not launch by the given reward',(done)=>{
            chai.request(server)
            .put('/rewards/launch/'+id+'1')
            .end((err,res)=>{
                res.should.have.status(500);
                res.body.should.be.a("object");
                res.body.should.have
                  .property("message")
                  .eql("Internal server error");
                done()
            });   
        });
        it('It should give Bad Request by the wrong given id', (done) => {
            const id_num="61a1d9751075ba088c43f562"
            chai.request(server)
                .put('/rewards/' +id_num)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                res.body.should.have
                  .property("message")
                  .eql("Bad Request");
                    done();
                });
        });
    });

    describe('/DELETE/:id rewards', () => {
        it('It should delete a rewards by the id ',(done)=>{
            chai.request(server)
            .delete('/rewards/'+id)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have
                  .property("message")
                  .eql("rewards successfully deleted!");
                res.body.should.have.property("data");
                done()
            });
        });
        it('it should not delete a rewards by the id',(done)=>{
            chai.request(server)
            .delete('/rewards/'+id+'1')
            .end((err,res)=>{
                res.should.have.status(500);
                res.body.should.be.a("object");
                res.body.should.have
                  .property("message")
                  .eql("Internal server error");
                done()
            });   
        });
        it('It should give Bad Request by the wrong given id', (done) => {
            const id_num="61a1d9751075ba088c43f562"
            chai.request(server)
                .delete('/rewards/' +id_num)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                res.body.should.have
                  .property("message")
                  .eql("Bad Request");
                    done();
                });
        });
        
    });

    describe('get /search', ()=>{
        it('It search and give rewards if any matches found ', (done)=>{
            chai.request(server)
            .get('/rewards/search')
            .query({search: 'ily'})
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.data.results.should.be.a("array");
                res.body.data.results.length.should.be.above(0);
                done();
            });
        });
        it('It search and give when no matches found ', (done)=>{
            chai.request(server)
            .get('/rewards/search')
            .query({search: 'abcxyz'})
            .end((err,res)=>{
                res.should.have.status(400);
                res.body.should.be.a("object");
                res.body.should.have
                  .property("message")
                  .eql("Bad Request, No rewards found");
                done();
            });
        });
        it('It gives all data', (done)=>{
            chai.request(server)
            .get('/rewards/search')
            .query()
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data.results.should.be.a("array");
                done();
            });
        });
        it('It gives an internal server error', (done)=>{
            chai.request(server)
            .get('/rewards/search')
            .query({name: 'ann'})
            .end((err,res)=>{
                res.should.have.status(500);
                res.body.should.be.a("object");
                res.body.should.have
                  .property("message")
                  .eql("Internal Server Error");
                done();
            });
        });
    });

});