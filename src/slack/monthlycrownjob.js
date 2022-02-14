const { starOfTheMonth } = require("./operations");
const axios = require("axios");

const monthlyjob = async () => {
  try {
    await starOfTheMonth("Monthly");
  } catch (error) {
    console.log(error.message);
  }
};

const runMonthlyScript = async () => {
  const user = {
    email: process.env.slackemail,
    password: process.env.slackpassword,
  };
  try {
    await axios.post(`${process.env.URL}/login`, user).then(async (res) => {
      axios.defaults.headers.common["Authorization"] = res.data.data.token;
      await monthlyjob();
    });
  } catch (error) {
    console.log(error.message);
  } finally {
    await axios.get(`${process.env.URL}/logout`);
  }
};
runMonthlyScript();

module.exports = monthlyjob;
