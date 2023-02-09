const router = require("express").Router();
const UserModel = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validatePayload = require("../middlewares/validatePayload.js");
const { userLoginSchema } = require("../schemas/userLogin.js");

router.post("/login", validatePayload(userLoginSchema), async (req, res) => {
  //1- verify email, 2- pass verification -> return response

  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) return res.send("Invalid email!!");

  const passVerification = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!passVerification) return res.send("Invalid password!!");

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_JWT);
  user.password = undefined; // don't show password
  res.json({
    body: {
      user: user,
      token: token,
    },
  });
});

module.exports = router;
