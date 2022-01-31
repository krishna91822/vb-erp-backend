const { birthdayjob } = require("./operations");
const { workanniversary } = require("./operations");

async function dailycronjob() {
  try {
    console.log("Hi======================");
    await birthdayjob("Daily");
    await workanniversary("Daily");
  } catch (error) {
    console.log(error.message);
  }
}

const run = async () => {
  await dailycronjob();
};
run();

module.exports = dailycronjob;
