const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

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
  {
      maxPoolSize: 50, 
      wtimeoutMS: 2500,
      useNewUrlParser: true
  }
)
.then(() => console.log("Database connected!"))
.catch((err) => console.log(err.message));