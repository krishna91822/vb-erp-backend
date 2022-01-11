require("dotenv").config();
const { RTMClient } = require("@slack/rtm-api");
const { WebClient } = require("@slack/web-api");
const axios = require("axios");

const SLACK_OAUTH_TOKEN = process.env.SLACK_OAUTH_TOKEN;

const rtm = new RTMClient(SLACK_OAUTH_TOKEN);
const web = new WebClient(SLACK_OAUTH_TOKEN);

const ceoslackid = process.env.CEO_SLACK_ID;
const baseUrl = process.env.URL;
const birthdayImage = process.env.BIRTHDAY_IMAGE;
const anniversaryImage = process.env.WORK_ANNIVERSARY_IMAGE;
const starOfTheMonthImage = process.env.STAR_OF_THE_MONTH_IMAGE;
// const ceoslackid=process.env.CEO_SLACK_ID

const personalMessage = async (channel, message) => {
  const response = await web.chat.postMessage({
    channel: channel,
    text: " ",
    attachments: [
      {
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `${message} `,
            },
          },
        ],
      },
    ],
  });
  return response;
};
const channelMsg = async (channel, message) => {
  const response = await web.chat.postMessage({
    channel: channel,
    text: " ",
    attachments: [
      {
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `${message}`,
            },
          },
        ],
      },
    ],
  });
  return response;
};
const sendMessage = async (channel, message, image) => {
  const response = await web.chat.postMessage({
    channel: channel,
    text: " ",
    attachments: [
      {
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `:tada::tada: ${message}  :tada::tada:`,
            },
          },
          {
            type: "image",
            title: {
              type: "plain_text",
              text: ` `,
              emoji: true,
            },
            image_url: image,
            alt_text: "image1",
          },
          {
            type: "divider",
          },
        ],
      },
    ],
  });
  return response;
};

const findSlackId = async (empId = 0, empName = "dummy") => {
  let slackId;
  if (empId === 0 && empName != "dummy") {
    slackId = await axios.get(`${baseUrl}employees/reward/employee?empName=${empName}`);
  }
  if (empId != 0 && empName === "dummy") {
    slackId = await axios.get(`${baseUrl}employees/reward/employee?empId=${empId}`);
  }
  if (empId === 0 && empName === "dummy") {
    console.log("please pass employeeid or name");
    return null;
  }
  if (slackId.data.status === "failure") {
    console.log("something went wrong on serverside");
    return null;
  }
  if (slackId.length === 0) {
    console.log(`slack id not found for `);
    return null;
  }
  return slackId.data.data;
};

const findemployeeById = async (id) => {
  const som = await axios.get(`${baseUrl}employees/reward/employee?getEmpByID=${id}`);
  if (som.data.status === "failure") {
    console.log("something went wrong on serverside");
    return null;
  }
  if (som.data.data.length === 0) {
    console.log("star of the month employee not found");
    return null;
  }
  return som.data.data;
};

const todayWorkAnniversary = async () => {
  const emprec = await axios.get(
    `${baseUrl}employees/reward/employee?workAnniversary=${new Date()}`
  );
  if (emprec.data.status === "failure") {
    console.log("something went wrong on serverside");
    return null;
  }
  if (emprec.data.data.length === 0) {
    console.log("no work anniversary today");
    return null;
  }
  return emprec.data.data;
};

const todayEmpBirthday = async () => {
  const emprec = await axios.get(`${baseUrl}employees/reward/employee?dob=${new Date()}`);
  if (emprec.data.status === "failure") {
    console.log("something went wrong on serverside");
    return null;
  }
  if (emprec.data.data.length === 0) {
    console.log("no Birthday today");
    return null;
  }
  // findSlackId(emprec.data.data[0].empId)
  return emprec.data.data;
};

const getRewards = async (reward_type) => {
  const Rewards = await axios.get(
    `${baseUrl}rewards?rewardType=${reward_type}`
  );
  if (Rewards.data.status === "failure") {
    console.log("something went wrong on serverside");
    return null;
  }
  if (Rewards.data.data.length === 0) {
    console.log(`no ${reward_type} rewards Found `);
    return null;
  }
  return Rewards.data.data.results;
};

const getRewardById = async (rewardId) => {
  const Rewards = await axios.get(`${baseUrl}rewards/${rewardId}`);
  if (Rewards.data.status === "failure") {
    console.log("something went wrong on serverside");
    return null;
  }
  if (Rewards.data.data.length === 0) {
    console.log(`no ${rewardId} rewards Found `);
    return null;
  }
  return Rewards.data.data;
};

const getAllEmployee = async () => {
  let salckids = [];
  let ids;
  const emprec = await axios.get(`${baseUrl}employees/reward/employee`);
  if (emprec.data.status === "failure") {
    console.log("some server side error");
    return null;
  }
  if (emprec.data.data.length === 0) {
    console.log("no employee found");
    return null;
  }
  return emprec.data.data;
};

const getManagerDetail = async (ManagerName) => {
  const allManagersDetails = await axios.get(
    `${baseUrl}employees/reward/employee?managerDetail=${ManagerName}`
  );
  if (allManagersDetails.data.status === "failure") {
    console.log("something went wrong on server side");
    return null;
  }
  if (allManagersDetails.data.data.length === 0) {
    console.log("No Manager Name found");
    return null;
  }
  return allManagersDetails.data.data;
};

const getllManagersName = async () => {
  const allManagersName = await axios.get(`${baseUrl}employees/reward/employee?empDes=Manager`);
  if (allManagersName.data.status === "failure") {
    console.log("something went wrong on server side");
    return null;
  }
  if (allManagersName.data.data.length === 0) {
    console.log("No Manager Name found");
    return null;
  }
  const arr = [];
  await allManagersName.data.data.map((manname) => {
    arr.push(manname.empReportingManager);
  });
  const managersname = new Set(arr);
  return managersname;
};

const getAllEmpUnderManager = async (managerName) => {
  const allEmpUnderManagersDetails = await axios.get(
    `${baseUrl}employees/reward/employee?empUnderManager=${managerName}`
  );
  if (allEmpUnderManagersDetails.data.status === "failure") {
    console.log("something went wrong on server side");
    return null;
  }
  if (allEmpUnderManagersDetails.data.data.length === 0) {
    console.log(`No Emp Found Under Manager ${managerName}`);
    return null;
  }
  return allEmpUnderManagersDetails.data.data;
};

const replaceSenderAndReceiver = async (
  channelMsg,
  receiverMsg,
  receiverId,
  senderId
) => {
  let replaceChannelmsg, replaceReceivermsg;
  let msg = [];
  replaceChannelmsg = channelMsg.replace(/@sender/g, `@${senderId}`);
  msg.push(replaceChannelmsg.replace(/@receiver/g, `@${receiverId}`));
  replaceReceivermsg = receiverMsg.replace(/@sender/g, `@${senderId}`);
  msg.push(replaceReceivermsg.replace(/@receiver/g, `@${receiverId}`));
  // 0 index is channel msg 1st index is receiver msg
  return msg;
};

const sendspecicalmsg = async (
  announcement_type,
  message,
  empslackid,
  image,
  channelid = "default",
  personalmsg = "default"
) => {
  if (announcement_type === "public") {
    await sendMessage(channelid, message, image);
    await sendMessage(empslackid, personalmsg, image);
  } else if (announcement_type === "private") {
    await sendMessage(empslackid, personalmsg, image);
  }
};

// reward.reward_receiver, reward.selected_receiver

const checkMsgTypeAndSendSlackMessage = async (
  announcement_type,
  message,
  empslackid,
  channelName = "Default",
  privateMessage = "Default"
) => {
  // console.log(empslackid, privateMessage);
  if (announcement_type === "public") {
    await channelMsg(channelName, message);
    await personalMessage(empslackid, privateMessage);
  } else if (announcement_type === "private") {
    // console.log(privateMessage);
    await personalMessage(empslackid, privateMessage);
  }
};

const ceoMessages = async (reward) => {
  if (reward.reward_receiver === "Employees") {
    const emprec = await getAllEmployee();
    emprec.map(async (id) => {
      let empslackid;
      console.log(`CEO give shortout to ${id.empName}`);
      empslackid = await findSlackId(id.empId);
      // console.log(empslackid[0].slackMemId);
      if (empslackid != null) {
        if(!reward.channel_message){
          reward.channel_message=" "
        }
        let msg = await replaceSenderAndReceiver(
          reward.channel_message,
          reward.receiver_message,
          empslackid[0].slackMemId,
          ceoslackid
        );
        let publicmsg = msg[0];
        let privatemsg = msg[1];
        await checkMsgTypeAndSendSlackMessage(
          reward.announcement_type,
          publicmsg,
          empslackid[0].slackMemId,
          reward.slack_channel,
          privatemsg
        );
      }
    });
  }
  if (reward.reward_receiver === "Manager") {
    let mandetails;
    const allManagerName = await getllManagersName();
    if (allManagerName != null) {
      const setarrayofmanager = [...allManagerName];
      setarrayofmanager.map(async (managername) => {
        let empslackid;
        mandetails = await getManagerDetail(managername);
        if (mandetails != null) {
          console.log(
            `CEO ONDEMAND MESSAGE TO MANAGER ${mandetails[0].empName} `
          );
          empslackid = await findSlackId(mandetails[0].empId);
          if (empslackid != null) {
            if(!reward.channel_message){
              reward.channel_message=" "
            }
            let msg = await replaceSenderAndReceiver(
              reward.channel_message,
              reward.receiver_message,
              empslackid[0].slackMemId,
              ceoslackid
            );
            let publicmsg = msg[0];
            let privatemsg = msg[1];
            await checkMsgTypeAndSendSlackMessage(
              reward.announcement_type,
              publicmsg,
              empslackid[0].slackMemId,
              reward.slack_channel,
              privatemsg
            );
          }
        }
      });
    }
  }

  if (reward.reward_receiver === "everyone") {
  }

  if (reward.reward_receiver === "selected") {
    if (reward != null) {
      reward.recipients_ids.map(async (recepients) => {
        console.log(`CEO SEND SELECTED MESSAGE TO ${recepients.empName}`);
        if(!reward.channel_message){
          reward.channel_message=" "
        }
        let msg = await replaceSenderAndReceiver(
          reward.channel_message,
          reward.receiver_message,
          recepients.slackMemId,
          ceoslackid
        );
        let publicmsg = msg[0];
        let privatemsg = msg[1];
        await checkMsgTypeAndSendSlackMessage(
          reward.announcement_type,
          publicmsg,
          recepients.slackMemId,
          reward.slack_channel,
          privatemsg
        );
      });
    }
  }
};
// reward.reward_receiver, reward.selected_receiver
const managerMessage = async (reward) => {
  if (reward.reward_receiver === "Employees") {
    const emprec = await getAllEmployee();
    if (emprec != null) {
      emprec.map(async (emp) => {
        let empslackid, empmanslackid;
        console.log(
          `empName is ${emp.empName} id is ${emp.empId} managername is ${emp.empReportingManager} `
        );
        empslackid = await findSlackId(emp.empId);
        empmanslackid = await findSlackId(0, emp.empReportingManager);
        if (empslackid != null && empmanslackid != null) {
          if(!reward.channel_message){
            reward.channel_message=" "
          }
          let msg = await replaceSenderAndReceiver(
            reward.channel_message,
            reward.receiver_message,
            empslackid[0].slackMemId,
            empmanslackid[0].slackMemId
          );
          let publicmsg = msg[0];
          let privatemsg = msg[1];
          await checkMsgTypeAndSendSlackMessage(
            reward.announcement_type,
            publicmsg,
            empslackid[0].slackMemId,
            reward.slack_channel,
            privatemsg
          );
        }
      });
    }
  }
  if (reward.reward_receiver === "Manager") {
    let managerDetails;
    const allManager = await getllManagersName();
    if (allManager != null) {
      const allmanagersetarray = [...allManager];
      allmanagersetarray.map(async (managerName) => {
        let empslackid, empmanslackid;
        managerDetails = await getManagerDetail(managerName);
        // console.log(managerDetails);
        managerDetails.map(async (managerDetails) => {
          // console.log(managerDetails);
          if (managerDetails != null) {
            console.log(
              `MANAGER ${managerDetails.empName} SEND MESSAGE TO THEIR MANAGER ${managerDetails.empReportingManager}`
            );
            empslackid = await findSlackId(managerDetails.empId);
            empmanslackid = await findSlackId(
              0,
              managerDetails.empReportingManager
            );
            if (empslackid != null && empmanslackid != null) {
              if(!reward.channel_message){
                reward.channel_message=" "
              }
              let msg = await replaceSenderAndReceiver(
                reward.channel_message,
                reward.receiver_message,
                empmanslackid[0].slackMemId,
                empslackid[0].slackMemId
              );
              let publicmsg = msg[0];
              let privatemsg = msg[1];
              await checkMsgTypeAndSendSlackMessage(
                reward.announcement_type,
                publicmsg,
                empmanslackid[0].slackMemId,
                reward.slack_channel,
                privatemsg
              );
            }
          }
        });
      });
    }
  }

  if (reward.reward_receiver === "everyone") {
  }

  if (reward.reward_receiver === "selected") {
    if (reward.recipients_ids != null) {
      reward.recipients_ids.map(async (recepients) => {
        let empmanslackid, empslackid;
        empslackid = recepients.slackMemId;
        empmanslackid = await findSlackId(0, recepients.empReportingManager);
        if (empmanslackid != null) {
          console.log(
            `SELECTED MESAGE TO ${recepients.empName} from ${empmanslackid[0].empName}`
          );
          if(!reward.channel_message){
            reward.channel_message=" "
          }
          let msg = await replaceSenderAndReceiver(
            reward.channel_message,
            reward.receiver_message,
            empslackid,
            empmanslackid[0].slackMemId
          );
          let publicmsg = msg[0];
          let privatemsg = msg[1];
          await checkMsgTypeAndSendSlackMessage(
            reward.announcement_type,
            publicmsg,
            empslackid,
            reward.slack_channel,
            privatemsg
          );
        }
      });
    }
  }
};

// reward.reward_receiver,reward.selected_receiver,reward.selected_sender
const selectedMessages = async (reward) => {
  if (!Array.isArray(reward.sender_id)) {
    reward.sender_id = [reward.sender_id];
  }
  if (reward.reward_receiver === "Manager") {
    if (reward.sender_id != null) {
      let empslackid, empmanslackid;
      empslackid = reward.sender_id[0].slackMemId;
      empmanslackid = await findSlackId(
        0,
        reward.sender_id[0].empReportingManager
      );
      if (empmanslackid != null) {
        console.log(
          `selected manager ${reward.sender_id[0].empName} message to their manager ${empmanslackid[0].empName}`
        );
        if(!reward.channel_message){
          reward.channel_message=" "
        }
        let msg = await replaceSenderAndReceiver(
          reward.channel_message,
          reward.receiver_message,
          empmanslackid[0].slackMemId,
          empslackid
        );
        let publicmsg = msg[0];
        let privatemsg = msg[1];
        await checkMsgTypeAndSendSlackMessage(
          reward.announcement_type,
          publicmsg,
          empmanslackid[0].slackMemId,
          reward.slack_channel,
          privatemsg
        );
      }
    }
  }
  if (reward.reward_receiver === "Employees") {
    if (reward != null) {
      let empslackid;
      const empmanslackid = reward.sender_id[0].slackMemId;
      const allemp = await getAllEmployee();
      allemp.map(async (emp) => {
        empslackid = emp.slackMemId;
        console.log(
          `Manager ${reward.sender_id[0].empName} with slack id ${empmanslackid} send message to employee ${emp.empName} with slackid ${empslackid}`
        );
        if(!reward.channel_message){
          reward.channel_message=" "
        }
        let msg = await replaceSenderAndReceiver(
          reward.channel_message,
          reward.receiver_message,
          emp.slackMemId,
          empmanslackid
        );
        let publicmsg = msg[0];
        let privatemsg = msg[1];
        // console.log(privatemsg);
        await checkMsgTypeAndSendSlackMessage(
          reward.announcement_type,
          publicmsg,
          emp.slackMemId,
          reward.slack_channel,
          privatemsg
        );
      });
    }
  }
  if (reward.reward_receiver === "everyone") {
  }
  if (reward.reward_receiver === "selected") {
    if (reward.sender_id != null && reward.recipients_ids != null) {
      let empmanslackid, empslackid;
      empmanslackid = reward.sender_id[0].slackMemId;
      reward.recipients_ids.map(async (recepients) => {
        empslackid = recepients.slackMemId;
        console.log(
          `selectd sender ${reward.sender_id[0].empName} send message to selected recepient ${recepients.empName}`
        );
        if(!reward.channel_message){
          reward.channel_message=" "
        }
        let msg = await replaceSenderAndReceiver(
          reward.channel_message,
          reward.receiver_message,
          empslackid,
          empmanslackid
        );
        let publicmsg = msg[0];
        let privatemsg = msg[1];
        await checkMsgTypeAndSendSlackMessage(
          reward.announcement_type,
          publicmsg,
          recepients.slackMemId,
          reward.slack_channel,
          privatemsg
        );
      });
    }
  }
};

const birthdayjob=async(rewards)=>{
  let dailyreward
  if(rewards==="Daily"){
    dailyreward=await getRewards("Daily")
  }
  else{
    const rewardbyid=await getRewardById(rewards)
    dailyreward=[rewardbyid]
    dailyreward[0].sender_id=[rewardbyid.sender_id]
  }
  if(dailyreward!=null){
    dailyreward.map(async(reward)=>{
      if(reward.status==="In Progress"){
      if(reward.reward_subType=="birthday-celebration"){
        if(reward.reward_receiver==="Employees"){
          let birthday = await todayEmpBirthday();
          if (birthday != null) {
            birthday.map(async (birthday) => {
              let empsalckid, empManslackid;
              let managerid,empid
              // empsalckid = await findSlackId(birthday.empId);
              if(reward.reward_sender==="CEO"){
                empManslackid=ceoslackid
                empid=await findSlackId(birthday.empId)
                empsalckid=empid[0].slackMemId
              }
              else if(reward.reward_sender==="Manager"){
                managerid = await findSlackId(0,birthday.empReportingManager);
                empManslackid=managerid[0].slackMemId
                empid=await findSlackId(birthday.empId)
                empsalckid=empid[0].slackMemId
              }
              else if(reward.reward_sender==="selected"){
                empManslackid=await reward.sender_id[0].slackMemId
                if(birthday.empReportingManager===reward.sender_id[0].empName){
                  empid=await findSlackId(birthday.empId)
                  empsalckid=empid[0].slackMemId
                }
              }
              console.log(`birthday ${birthday.empName} from ${reward.reward_sender}`)
              if (empsalckid != null && empManslackid != null) {
                if(!reward.channel_message){
                  reward.channel_message=" "
                }
                let msg = await replaceSenderAndReceiver(
                  reward.channel_message,
                  reward.receiver_message,
                  empsalckid,
                  empManslackid
                );
                let publicmsg = msg[0];
                let privatemsg = msg[1];
                await sendspecicalmsg(
                  reward.announcement_type,
                  publicmsg,
                  empsalckid,
                  birthdayImage,
                  reward.slack_channel,
                  privatemsg
                );
              }
            });
          }
        }
      }
    }
    })
  }
}

const workanniversary=async(rewards)=>{
  let dailyreward
  if(rewards==="Daily"){
    dailyreward=await getRewards("Daily")
  }
  else{
    const rewardbyid=await getRewardById(rewards)
    dailyreward=[rewardbyid]
    dailyreward[0].sender_id=[rewardbyid.sender_id]
  }
  if(dailyreward!=null){
    dailyreward.map(async(reward)=>{
      if(reward.status==="In Progress"){
        if(reward.reward_subType=="work-anniversary"){
          if(reward.reward_receiver==="Employees"){
            anniversary = await todayWorkAnniversary();
            if (anniversary != null) {
              anniversary.map(async (anniversary) => {
                let empsalckid, empmanslackid;
                // console.log(
                //   "anniversary",
                //   "name",
                //   anniversary.empName,
                //   "id",
                //   anniversary.empId,
                //   "manager",
                //   anniversary.empReportingManager
                // );
                // empsalckid = await findSlackId(anniversary.empId);
                let managerid,empid
                if(reward.reward_sender==="CEO"){
                  empmanslackid=ceoslackid
                  empid=await findSlackId(anniversary.empId)
                  empsalckid=empid[0].slackMemId
                }
                else if(reward.reward_sender==="Manager"){
                  managerid = await findSlackId(0,anniversary.empReportingManager);
                  empmanslackid=managerid[0].slackMemId
                  empid=await findSlackId(anniversary.empId)
                  empsalckid=empid[0].slackMemId
                }
                else if(reward.reward_sender==="selected"){
                  empmanslackid=await reward.sender_id[0].slackMemId
                  if(anniversary.empReportingManager===reward.sender_id[0].empName){
                    empid=await findSlackId(anniversary.empId)
                    empsalckid=empid[0].slackMemId
                  }
                }
                console.log(`anniversary ${anniversary.empName} from ${reward.reward_sender}`)
                if (empsalckid != null && empmanslackid != null) {
                  if(!reward.channel_message){
                    reward.channel_message=" "
                  }
                  let msg = await replaceSenderAndReceiver(
                    reward.channel_message,
                    reward.receiver_message,
                    empsalckid,
                    empmanslackid
                  );
                  let publicmsg = msg[0];
                  let privatemsg = msg[1];
                  await sendspecicalmsg(
                    reward.announcement_type,
                    publicmsg,
                    empsalckid,
                    anniversaryImage,
                    reward.slack_channel,
                    privatemsg
                  );
                }
              });
            }

          }        }
      }
    })

  }
}

const starOfTheMonth = async (rewards) => {
  let monthlyReward
  if(rewards==="Monthly"){
    monthlyReward=await getRewards("Monthly")
  }
  else{
    const rewardbyid=await getRewardById(rewards)
    monthlyReward=[rewardbyid]
    monthlyReward[0].sender_id=[rewardbyid.sender_id]
  }
  // const monthlyReward = await getRewards("Monthly");
  if (monthlyReward != null) {
    monthlyReward.map(async (reward) => {
      if (reward.status != "In Progress") {
        console.log(`${reward.reward_display_name} are not In Progress State`);
      }
      if (reward.status === "In Progress") {
        if (reward.reward_subType === "starOfTheMonth") {
          if (
            reward.reward_receiver === "selected"
          ) {
            reward.recipients_ids.map(async (recepients) => {
              let empslackid, empmanslackid;
              let managerid
                if(reward.reward_sender==="CEO"){
                  empmanslackid=ceoslackid
                  empslackid = recepients.slackMemId;
                }
                else if(reward.reward_sender==="Manager"){
                  managerid = await findSlackId(0,recepients.empReportingManager);
                  empmanslackid=managerid[0].slackMemId
                  empslackid = recepients.slackMemId;
                }
                else if(reward.reward_sender==="selected"){
                  empmanslackid=await reward.sender_id[0].slackMemId
                  if(recepients.empReportingManager===reward.sender_id[0].empName){
                    empslackid = recepients.slackMemId;
                  }
                }
              // empmanslackid = await findSlackId(0,recepients.empReportingManager);
              console.log(
                `congratulation ${recepients.empName} you are star of month from ${empmanslackid}`
              );
              if(!reward.channel_message){
                reward.channel_message=" "
              }
              let msg = await replaceSenderAndReceiver(
                reward.channel_message,
                reward.receiver_message,
                empslackid,
                empmanslackid
              );
              let publicmsg = msg[0];
              let privatemsg = msg[1];
              await sendspecicalmsg(
                reward.announcement_type,
                publicmsg,
                empslackid,
                starOfTheMonthImage,
                reward.slack_channel,
                privatemsg
              );
            });
          }
        }
      }
    });
  }
};

module.exports = {
  sendMessage,
  getRewards,
  todayEmpBirthday,
  todayWorkAnniversary,
  findemployeeById,
  findSlackId,
  getAllEmployee,
  personalMessage,
  getllManagersName,
  getManagerDetail,
  getAllEmpUnderManager,
  ceoMessages,
  managerMessage,
  selectedMessages,
  getRewardById,
  channelMsg,
  checkMsgTypeAndSendSlackMessage,
  sendspecicalmsg,
  replaceSenderAndReceiver,
  replaceSenderAndReceiver,
  birthdayjob,
  workanniversary,
  starOfTheMonth
};
