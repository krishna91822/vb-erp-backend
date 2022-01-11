const { birthdayjob } = require("./operations");
const { workanniversary } = require("./operations");
var cron = require('node-cron');

// const crons=cron.schedule('* * * * *', () => {
//   console.log('running a  daily task every minute');
//   dailycronjob()
// });

const dailycronjob=async()=>{
  await birthdayjob("Daily")
  await workanniversary("Daily")
}

// dailycronjob()
module.exports=dailycronjob
