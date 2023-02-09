const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./router/auth.js");
const userRoutes = require("./router/user.js");

const app = express();
app.use(express.json())
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log("Database Connect has been success!") 
    const port = process.env.PORT || 3000
    app.listen(port, () => `Server is running on ${port}`)
  }).catch(e => {
    console.log(e)
  })
