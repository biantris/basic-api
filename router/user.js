const express = require("express");
const router = express.Router();

const UserModel = require("../models/User");

const Joi = require("joi");
// change this to Yup :)

const bcrypt = require("bcrypt");
// 1- generate a salt = random text
// 2- hash a password = hash(121313, salt)

const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verifyJwt");

//get token
router.get("/token", (req, res) => {
  const token = jwt.sign({ _id: "456239828" }, process.env.SECRET_JWT);
  res.send(token);
});

//userPost controller
router.post("/add", async (req, res) => {
  const schema = {
    name: Joi.string().min(5).required(),
    email: Joi.string().min(5).email().required(),
    password: Joi.string().min(6).required(),
  };

  const { error } = Joi.ValidationError(req.body, schema);
  if (error) return res.send(error.details[0].message);

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });

    const save = await user.save();
    res.send(save);
  } catch (err) {
    res.status(500).send("System found unexpected behavior and stoped processing the request");
  }
});

//userGetAll controller
router.get("/all", verifyToken, async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (err) {
    res.status(500).send("System found unexpected behavior and stoped processing the request");
  }
});

//userGet controller
router.get("/user/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    res.send(user);
  } catch (err) {
    res.status(500).send("System found unexpected behavior and stoped processing the request");
  }
});

//userDelete controller
router.delete("/user/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deleteUser = await UserModel.remove({
      _id: id,
    });
    res.send(deleteUser);
  } catch (err) {
    res.status(500).send("System found unexpected behavior and stoped processing the request");
  }
});

//userUpdate controller
router.put("/user/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const updateUser = await UserModel.updateOne(
      {
        _id: id,
      },
      {
        $set: req.body,
      }
    );
    res.send(updateUser);
  } catch (err) {
    res.status(500).send("System found unexpected behavior and stoped processing the request");
  }
});

module.exports = router;