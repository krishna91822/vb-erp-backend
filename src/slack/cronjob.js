// const cron = require('node-cron');
// const monthlyjob=require('./monthlycrownjob')
// const dailycronjob=require('./dailycronjob')

// //monthly cronjob
// const monthly=cron.schedule('* * * * *', () => {
//   console.log('running a monthly task every minute');
//   monthlyjob()
// });


// //daily cron job
// const daily=cron.schedule('* * * * *', () => {
//     console.log('running a daily task every minute');
//     dailycronjob()
//   });

// module.exports={monthly,daily}