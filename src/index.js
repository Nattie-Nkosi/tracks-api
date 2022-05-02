require("./models/User");
require("./models/Track");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoute");
const trackRoutes = require("./routes/trackRoute");

const requireAuth = require("./middlewares/requireAuth");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT;

mongoose.connect(mongoUri);
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connection to mongoDB", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.all("*", (req, res) => {
  res.status(404).send({ error: "Route Not Found" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
