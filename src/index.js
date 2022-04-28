const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

dotenv.config();
const app = express();

const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT;

mongoose.connect(mongoUri);
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connection to mongoDB", err);
});

app.get("/", (req, res) => {
  res.send("<h1>Hi There</h1>");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
