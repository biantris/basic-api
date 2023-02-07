const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv/config");

const app = express();

app.use(express.json())

const userRoutes = require("./router/user");
app.use("/api", userRoutes);

const authRoutes = require("./router/auth");
app.use("api/auth", authRoutes);

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
