const dotenv = require("dotenv");
process.on("uncaughtException", (err) => {
  // eslint-disable-next-line no-console
  console.log("UNHANDLED EXCEPTION! 💥 Shutting down...");
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);
  process.exit(1);
});
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const app = require("./app");
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`DB connection succesful!`))
  .catch((e) => console.log(e));

const port = process.env.PORT || '8000';
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  // eslint-disable-next-line no-console
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
