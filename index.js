const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI);

const marvelRoutes = require("./Routes/marvel");

const userRoutes = require("./Routes/user");
app.use(marvelRoutes);
app.use(userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Marvel API !" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "route doesn't exist" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
