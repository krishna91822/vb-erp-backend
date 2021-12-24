const { starOfTheMonth } = require("./operations");
var cron = require('node-cron');

// const crons=cron.schedule('* * * * *', () => {
//   console.log('running a task every minute');
//   monthlyjob()
// });

// const starOfTheMonthImage = process.env.STAR_OF_THE_MONTH_IMAGE;

const monthlyjob=async()=>{
  await starOfTheMonth("Monthly")
}

// monthlyReward();

module.exports = monthlyjob;
