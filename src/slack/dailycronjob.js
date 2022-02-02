require("dotenv").config();
const { birthdayjob } = require("./operations");
const { workanniversary } = require("./operations");
const axios = require("axios");

async function dailycronjob() {
  try {
    await birthdayjob("Daily");
    await workanniversary("Daily");
  } catch (error) {
    console.log(process.env.NODE_ENV, "here2");
    console.log(error.message);
  }
}

const runDailyScript = async () => {
  const user = {
    email: process.env.slackemail,
    password: process.env.slackpassword,
  };
  try {
    await axios.post(`${process.env.URL}/login`, user).then(async (res) => {
      axios.defaults.headers.common["Authorization"] = res.data.data.token;
      await dailycronjob();
    });
  } catch (error) {
    console.log(error.message);
  } finally {
    await axios.get(`${process.env.URL}/logout`);
  }
};
runDailyScript();

module.exports = dailycronjob;
