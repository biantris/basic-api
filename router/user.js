const express = require("express");
const router = express.Router();

const UserModel = require("../models/User");

//userPost
router.post("/add", async (req, res) => {
  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const save = await user.save();
  try {
    res.send(save);
  } catch (err) {
    res.send(err);
  }
});

//userGetAll
router.get("/all", async (req, res) => {
  const users = await UserModel.find();
  try {
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

//userGet
router.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const user = await UserModel.findById(id);
  try {
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

//userDelete
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

//userUpdate
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
