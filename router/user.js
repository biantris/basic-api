const router = require("express").Router();
const UserModel = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validatePayload = require("../middlewares/validatePayload.js");
const { updateUserSchema } = require("../schemas/updateUser.js");
const { addUserSchema } = require("../schemas/addUser.js");
const verifyToken = require("../middlewares/verifyJwt.js");

//get token
router.get("/token", (req, res) => {
  const token = jwt.sign({ _id: "456239828" }, process.env.SECRET_JWT);
  res.status(200).json({ token });
});

//userPost controller
router.post("/add", validatePayload(addUserSchema), async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  const save = await user.save();
  try {
    res.send(save);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error, try again soon" });
  }
});

//userGetAll controller
router.get("/all", verifyToken, async (req, res) => {
  const users = await UserModel.find();
  try {
    res.send(users);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error, try again soon" });
  }
});

//userGet controller
router.get("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const user = await UserModel.findById(id);
  try {
    res.send(user);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error, try again soon" });
  }
});

//userDelete controller
router.delete("/delete/:id", verifyToken, async (req, res) => {
  const id = req.params.id;

  const deleteUser = await UserModel.remove({
    _id: id,
  });

  try {
    res.send(deleteUser);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error, try again soon" });
  }
});

//userUpdate controller
router.put("/update/:id", verifyToken, validatePayload(updateUserSchema), async (req, res) => {
  const id = req.params.id;
  await UserModel.updateOne(
    {
      _id: id,
    },
    {
      $set: req.body,
    }
  );

  try {
    res.status(204);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error, try again soon" });
  }
});

module.exports = router;
