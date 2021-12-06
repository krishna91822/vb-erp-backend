require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`server starting on PORT ${PORT}....`);
});

//error handler for uncaught exception
process.on("uncaughtException", (err) => {
  console.log(err.name, err);
  console.log("UNCAUGHT EXCEPTION! 🔥 Shutting Down...");
  process.exit(1);
});

//error handler for unhandled rejection
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! 🔥 Shutting Down...");
  server.close(() => {
    process.exit(1);
  });
});
