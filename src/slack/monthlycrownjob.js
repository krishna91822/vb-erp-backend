const { starOfTheMonth } = require("./operations");

const monthlyjob = async () => {
  try {
    await starOfTheMonth("Monthly");
  } catch (error) {
    console.log(error.message);
  }
};

monthlyjob();

module.exports = monthlyjob;
