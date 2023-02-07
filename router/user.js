const express = require("express");
const router = express.Router();

const UserModel = require("../models/User");

const Joi = require("@hapi/joi");
// change this to Yup :)
const bcrypt = require("bcrypt");
// 1- generate a salt = random text
// 2- hash a password = hash(121313, salt)

//userPost controller
router.post("/add", async (req, res) => {
  const schema = {
    name: Joi.string().min(5).required(),
    email: Joi.string().min(5).email().required(),
    password: Joi.string().min(6).required(),
  };

  const { error } = Joi.ValidationError(req.body, schema);
  if (error) return res.send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  const save = await user.save();
  try {
    res.send(save);
  } catch (err) {
    res.send(err);
  }
});

//userGetAll controller
router.get("/all", async (req, res) => {
  const users = await UserModel.find();
  try {
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

//userGet controller
router.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const user = await UserModel.findById(id);
  try {
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

//userDelete controller
router.delete("/user/:id", async (req, res) => {
  const id = req.params.id;

  const deleteUser = await UserModel.remove({
    _id: id,
  });

  try {
    res.send(deleteUser);
  } catch (err) {
    res.send(err);
  }
});

//userUpdate controller
router.update("/user/:id", async (req, res) => {
  const id = req.params.id;

  const updateUser = await UserModel.updateOne(
    {
      _id: id,
    },
    {
      $set: req.body,
    }
  );

  try {
    res.send(updateUser);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
