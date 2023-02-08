const router = require("express").Router();

const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  //1- verify email, 2- pass verification -> return response
  try{
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.send("Invalid credentials!!");

    const passVerification = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passVerification) return res.send("Invalid credentials!!");

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_JWT);
    user.password = undefined; // don't show password
    res.json({
      body: {
        user: user,
        token: token,
      },
    });
  }catch(err){
    res.status(500).send("System found unexpected behavior and stoped processing the request");
  }
});

module.exports = router;