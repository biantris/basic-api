const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv/config");

const app = express();

const userRoutes = require("./router/user");

app.use("/api", userRoutes);

app.listen("3000", () => {
  console.log("Server is running (~˘▾˘)~");
});

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParse: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err.message);
    }
    console.log("Database connected!");
  }
);
