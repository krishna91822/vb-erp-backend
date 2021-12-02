const { object } = require("joi");
const rewardsModal = require("../models/reward");
const { rewardSchema } = require("../schema/rewardSchema");
const { customResponse, customPagination } = require("../utility/helper");

const getRewards = async (req, res) => {
    /*
      #swagger.tags = ['Rewards']
      #swagger.description = 'Get all rewards' 
      #swagger.parameters['page'] = {
        in: 'query',
        type: 'integer',
        description: 'Page number' 
      }
      #swagger.parameters['sortBy'] = {
        in: 'query',
        type: 'string',
        description: 'sorting by which property' 
      }
      #swagger.parameters['sortOrder'] = {
        in: 'query',
        type: 'string',
        description: 'sort order like desc' 
      }
      #swagger.parameters['status'] = {
        in: 'query',
        type: 'string',
        description: 'reward status' 
      }
      #swagger.parameters['startdate'] = {
        in: 'query',
        type: 'string',
        description: 'Start date' 
      }
      #swagger.parameters['enddate'] = {
        in: 'query',
        type: 'string',
        description: 'End date' 
      }
      #swagger.responses[200] = {
        schema:{
          "status": "success",
          "code": 200,
          "message": "",
          "data": {
            "results": [
              {
                "_id": "610d090636ba149966bd3b55",
               "reward_name":"reward def",
               "reward_display_name": "reward def",
               "reward_type": "reward def",
               "reward_sender": "Manager",
               "recepients": ["Employee"],
               "receiver_message": "def",
               "announcement_type": "def",
               "slack_channel": "#birthday",
               "channel_message": "def messsage",
               "status": "Draft",
               "employee_id":20,
               "createdAt":"2021-11-26T09:25:14.681Z",
               "updatedAt":"2021-11-26T09:25:14.681Z"
              }
            ]
          },
          "error": {}
        }
      }
      #swagger.responses[500] = {
      description: 'Internal Server Error',
      schema: { 
        "status": "failure",
        "code": 400,
        "message": "Internal Server Error",
        "data":{},
        "error": {}
        }
      }
  */
  let code ,message;
  let rewards;
  let query = [
    {
      $match: {
        reward_name: { $regex: "" },
      },
    },
  ];
  if (req.query.status) {
    query.push({
      $match: {
        status: req.query.status,
      },
    });
  }

  if (req.query.startdate && req.query.enddate) {
    query.push({
      $match: {
        createdAt: {
          $gte: new Date(req.query.startdate),
          $lt: new Date(req.query.enddate),
        },
      },
    });
  }

  if (req.query.sortBy) {
    let sortOrder = 1;
    if (req.query.sortOrder === "desc") sortOrder = -1;
    const sort = {};
    sort[req.query.sortBy] = sortOrder;
    query.push({
      $sort: sort,
    });
  } else {
    query.push({
      $sort: { createdAt: 1 },
    });
  }
  const limit = 15;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  try {
   code=200;
    rewards = await rewardsModal.aggregate(query);
    const data=customPagination({data:rewards,page:page,limit:limit});
    const resData=customResponse({code,data})
    res.status(code).send(resData);
    
  } catch (error) {
    code=500;
    message="Internal Server error"
    res.status(code).send(error.message);
  }
};

const storeReward = async (req, res) => {
  /*
   	#swagger.tags = ['Rewards']
    #swagger.description = 'Create new Reward'
    #swagger.parameters['obj'] = {
        in: 'body',
        schema: {
            $reward_name:"reward def",
            $reward_display_name: "reward def",
            $reward_type: "reward def",
            $reward_sender: "Manager",
            $recepients: ["Employee"],
            $receiver_message: "def",
            $announcement_type: "def",
            $slack_channel: "#birthday",
            $channel_message: "def messsage",
            $employee_id:30
        }
      }
      #swagger.responses[201] = {
        description: 'Reward successfully created.',
        schema: { 
          "status": "success",
          "code": 201,
          "message": "",
          "data": {
             "_id": "610d090636ba149966bd3b55",
            "reward_name":"reward def",
            "reward_display_name": "reward def",
            "reward_type": "reward def",
            "reward_sender": "Manager",
            "recepients": ["Employee"],
            "receiver_message": "def",
            "announcement_type": "def",
            "slack_channel": "#birthday",
            "channel_message": "def messsage",
            "status": "Draft",
            "employee_id":20,
            "createdAt":"2021-11-26T09:25:14.681Z",
            "updatedAt":"2021-11-26T09:25:14.681Z"
          },
          "error": {}
        }
      }
      #swagger.responses[422] = {
      description: 'Invalid request data',
      schema: { 
        "status": "failure",
        "code": 404,
        "message": 'Invalid request data',
        "data":{},
        "error": {}
        }
      }
      #swagger.responses[500] = {
      description: 'Internal Server Error',
      schema: { 
        "status": "failure",
        "code": 400,
        "message": "Internal Server Error",
        "data":{},
        "error": {}
        }
      }
  */
 let code,message
 const { error } = rewardSchema.validate(req.body)
 if (error) {
  code = 422;
  message = "Invalid request data";
  const resData = customResponse({
    code,
    message,
    err: error && error.details,
  });
  return res.status(code).send(resData);
}
  try {
    code = 201;
      const rewards = await new rewardsModal(req.body);
      rewards.save()
      const resdata=customResponse({code,data:rewards})
    return res.status(code).send(resdata)
    } catch (error) {
      code = 500;
      message = "Internal server error";
      const resData = customResponse({
        code,
        message,
        err: error,
      });
      return res.status(code).send(resData);
    }
};

const getRewardDetail = async (req, res) => {
    /* 	
      #swagger.tags = ['Rewards']
      #swagger.description = 'Get Rewatd Detail' 
       #swagger.parameters['id'] = {
        in: 'path',
        type: 'string',
        description: 'Reward id which we want to find' 
      }
      #swagger.responses[200] = {
        schema:{
          "status": "success",
          "code": 200,
          "message": "",
          "data":  {
            "_id": "610bc1b31b82a66f6bcd64ea",
            "reward_name":"reward def",
               "reward_display_name": "reward def",
               "reward_type": "reward def",
               "reward_sender": "Manager",
               "recepients": ["Employee"],
               "receiver_message": "def",
               "announcement_type": "def",
               "slack_channel": "#birthday",
               "channel_message": "def messsage",
               "status": "Draft",
               "employee_id":20,
               "createdAt":"2021-11-26T09:25:14.681Z",
               "updatedAt":"2021-11-26T09:25:14.681Z"
          },
          "error": {}
        }
      }
      #swagger.responses[400] = {
      description: 'Bad request',
      schema: { 
        "status": "failure",
        "code": 400,
        "message": "Bad request",
        "data":{},
        "error": {}
        }
      }
      #swagger.responses[500] = {
      description: 'Internal Server Error',
      schema: { 
        "status": "failure",
        "code": 400,
        "message": "Internal Server Error",
        "data":{},
        "error": {}
        }
      }
  */
 let code,message;
 const _id=req.params.id
  try{
    code=200;
      const rewards = await rewardsModal.findById({_id});
      if(!rewards){
        code = 400;
        message="Bad Request"
        const resdata=customResponse({code,message})
          return res.status(code).send(resdata);
      }
      const resdata=customResponse({code,data:rewards})
      res.status(code).send(resdata);
  } catch (error){
      code=500;
      message="Internal Server Error"
      const resdata=customResponse({code,message,err:error});
      res.status(code).send(resdata);
    }
};

const editReward = async (req, res) => {
  /* 
      #swagger.tags = ['Rewards']
      #swagger.description = 'Update Reward' 
       #swagger.parameters['id'] = {
       in: 'path',
       type: 'string',
       description: 'Reward id which we want to update/edit'
      }
      #swagger.parameters['obj'] = {
        in: 'body',
        schema: {
            $reward_name:"reward def",
            $reward_display_name: "Best Employee",
            $reward_type: "reward def",
            $reward_sender: "Manager",
            $recepients: ["Selected"],
            $receiver_message: "def",
            $announcement_type: "def",
            $slack_channel: "#birthday",
            $channel_message: "def messsage",
            $employee_id:20
        }
      }
      #swagger.responses[200] = {
        description: 'rewards updated',
        schema: { 
          "status": "success",
          "code": 200,
          "message": "rewards successfully updated!",
          "data":  {
              "_id": "610bc1b31b82a66f6bcd64ea",
              "reward_name":"reward def",
               "reward_display_name": "reward def",
               "reward_type": "reward def",
               "reward_sender": "Manager",
               "recepients": ["Employee"],
               "receiver_message": "def",
               "announcement_type": "def",
               "slack_channel": "#birthday",
               "channel_message": "def messsage",
               "status": "Draft",
               "employee_id":20,
               "createdAt":"2021-11-26T09:25:14.681Z",
               "updatedAt":"2021-11-26T09:25:14.681Z"
          },
          "error": {}
        }
      }
      #swagger.responses[400] = {
      description: 'Bad request',
      schema: { 
        "status": "failure",
        "code": 400,
        "message": "Bad request",
        "data":{},
        "error": {}
        }
      }
      #swagger.responses[500] = {
      description: 'Internal Server Error',
      schema: { 
        "status": "failure",
        "code": 400,
        "message": "Internal Server Error",
        "data":{},
        "error": {}
        }
      }
  */
 let code,message;
 let _id=req.params.id
  try{
    code=200;
    message= "rewards successfully updated!";
      const rewards = await rewardsModal.findOneAndUpdate
      (
        {_id},
        {...req.body},
        {new:true}
      );
      if(!rewards){
        code=400;
        message="Bad Request";
        const resdata=customResponse({code,message});
        return res.status(code).send(resdata)
      };
      rewards.save()
      const resdata=customResponse({code,message,data:rewards})
      res.status(code).send(resdata);
  }catch (error){
    code = 500;
    message = "Internal server error";
    const resData = customResponse({
      code,
      message,
      err: error,
    });
    return res.status(code).send(resData);
  }
};

const deleteReward = async (req, res) => {
  /*
    #swagger.tags = ['Rewards']
    #swagger.description = 'Delete reward'
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'string',
      description: 'Reward id which we want to find'
    }
    #swagger.responses[200] = {
      schema:{
        "status": "success",
        "code": 200,
        "message": "Reward deleted successfully",
        "data":  {
              "_id": "610bc1b31b82a66f6bcd64ea",
              "reward_name":"reward def",
               "reward_display_name": "reward def",
               "reward_type": "reward def",
               "reward_sender": "Manager",
               "recepients": ["Employee"],
               "receiver_message": "def",
               "announcement_type": "def",
               "slack_channel": "#birthday",
               "channel_message": "def messsage",
               "status": "Draft",
               "employee_id":20,
               "createdAt":"2021-11-26T09:25:14.681Z",
               "updatedAt":"2021-11-26T09:25:14.681Z"
          },
        "error": {}
      }
    }
      #swagger.responses[400] = {
      description: 'Bad request',
      schema: { 
        "status": "failure",
        "code": 400,
        "message": "Bad request",
        "data":{},
        "error": {}
        }
      }
      #swagger.responses[500] = {
      description: 'Internal Server Error',
      schema: { 
        "status": "failure",
        "code": 400,
        "message": "Internal Server Error",
        "data":{},
        "error": {}
        }
      }
  */
 let code,message;
 const _id=req.params.id
  try{
      code=200;
      // find and delete reward by id
      const rewards = await rewardsModal.findByIdAndDelete({_id});
      if(!rewards){
        code=400;
        message="Bad Request";
        const resdata=customResponse({code,message});
        return res.status(code).send(resdata)
      };
      message = "rewards successfully deleted!";
      const resdata=customResponse({code,message,data:rewards})
      res.status(code).send(resdata);
      } catch(error){
        code = 500;
        message = "Internal server error";
        const resData = customResponse({
          code,
          message,
          err: error,
        });
        return res.status(code).send(resData);
      }
};
const launchRewards = async(req,res)=>{
    /*
      #swagger.tags = ['Rewards']
      #swagger.description = 'Launch Rewards'
      #swagger.parameters['id'] = {
        in: 'path',
        type: 'string',
        description: 'Reward id which we want to find'
      }
      #swagger.responses[200] = {
      schema:{
        "status": "success",
        "code": 200,
        "message": "reward already launched",
        "data":{},
        "error": {}
      }
    }
      #swagger.responses[200] = {
      schema:{
        "status": "success",
        "code": 200,
        "message": "Rewards are already in launch state",
        "data":{},
        "error": {}
      }
    }
      #swagger.responses[400] = {
      description: 'Bad request',
      schema: { 
        "status": "failure",
        "code": 400,
        "message": "Bad request",
        "data":{},
        "error": {}
        }
      }
      #swagger.responses[500] = {
      description: 'Internal Server Error',
      schema: { 
        "status": "failure",
        "code": 400,
        "message": "Internal Server Error",
        "data":{},
        "error": {}
        }
      }
    */
   let code,message;
  try{
      code=200
      const status="Launch"
      // update reward status to launch
      const rewards = await rewardsModal.findOneAndUpdate({_id:req.params.id},{$set:{status:status}});
      if(!rewards){
        code=400;
        message="Bad Request"
        const resdata=customResponse({code,message})
          return res.status(code).send(resdata);
      }
      if(rewards.status==="Launch"){ 
        message="Rewards are already in launch state"
        const resdata=customResponse({code,message})
          return res.status(200).send(resdata);
      }
      message="Rewards are launch"
      const resdata=customResponse({code,message})
      res.status(code).send(resdata);
  }catch (error){
    code = 500;
    message = "Internal server error";
    const resData = customResponse({
      code,
      message,
      err: error,
    });
    return res.status(code).send(resData);
  }
};

const searchRewards = async(req, res) => {
  /* 	
    #swagger.tags = ['Rewards']
    #swagger.description = 'Search Rewards' 
    #swagger.parameters['search'] = {
      in: 'query',
      type: 'string',
      description: 'Reward name which you want to search' 
    }
    #swagger.parameters['page'] = {
      in: 'query',
      type: 'string',
      description: 'page no' 
    }
    #swagger.responses[200] = {
      schema:{
        "status": "success",
        "code": 200,
        "message": "",
        "data":  {
          "_id": "610bc1b31b82a66f6bcd64ea",
          "reward_name":"reward def",
             "reward_display_name": "reward def",
             "reward_type": "reward def",
             "reward_sender": "Manager",
             "recepients": ["Employee"],
             "receiver_message": "def",
             "announcement_type": "def",
             "slack_channel": "#birthday",
             "channel_message": "def messsage",
             "status": "Draft",
             "employee_id":20,
             "createdAt":"2021-11-26T09:25:14.681Z",
             "updatedAt":"2021-11-26T09:25:14.681Z"
        },
        "error": {}
      }
    }
    #swagger.responses[400] = {
    description: 'Bad request',
    schema: { 
      "status": "failure",
      "code": 400,
      "message": "Bad request",
      "data":{},
      "error": {}
      }
    }
    #swagger.responses[500] = {
    description: 'Internal Server Error',
    schema: { 
      "status": "failure",
      "code": 400,
      "message": "Internal Server Error",
      "data":{},
      "error": {}
      }
    }
*/
let code,message;
const limit = 15;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const searchName= req.query;
try{
  if(Object.keys(req.query).length===0){
    const rewards =await rewardsModal.find({});
  code=200;
  const data=customPagination({data:rewards,page:page,limit:limit});
  const resData=customResponse({code,data})
  res.status(code).send(resData);  
  }
   else{  
  const rewards = await rewardsModal.find({$or:[{reward_name: {$regex:searchName.search.trim(), $options: 'i'}},
                                               {reward_type: {$regex:searchName.search.trim(), $options: 'i'}}]});
    if(rewards.length<1) {
      code=400;
      message="Bad Request, No rewards found"
      const resdata=customResponse({code,message})
        return res.status(code).send(resdata);
    }
        code=200;
        const data=customPagination({data:rewards,page:page,limit:limit});
    const resData=customResponse({code,data})
     return res.status(code).send(resData);  
  }  
  }
catch (error){
    code=500;
    message="Internal Server Error"
    const resdata=customResponse({code,message,err:error});
    res.status(code).send(resdata);
  }
};
module.exports = {
  storeReward,
  getRewards,
  getRewardDetail,
  editReward,
  deleteReward,
  launchRewards,
  searchRewards,
  };
