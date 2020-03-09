var express = require("express");
var router = express.Router();
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const validateToken = require("../Routes/TokenValidation");
require("dotenv").config();

//SignIn
router.post("/signin", async (req, res) => {
  let user;
  try {
    user = await User.findOne({
      id: req.body.user.id,
      typeUser: req.body.type
    });
    if (!user) {
      res.status(404).json({ message: "User not signed up" });
    } else {
      // user.location = req.body.user.location;
      // user.save();
      const { id, typeUser } = user;
      jwt.sign({ id, typeUser }, process.env.TOKEN_SECRET_KEY, (err, token) => {
        if (err) res.status(500).json({ error: err.message });

        res.status(200).json({ token: token, type: req.body.type });
      });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Sign Up
router.post("/signup", async (req, res) => {
  let user;
  try {
    user = await User.findOne({
      id: req.body.user.id,
      typeUser: req.body.type
    });

    if (!user) {
      let type = { typeUser: req.body.type };
      user = new User({ ...req.body.user, ...type });
    }

    await user.save();

    const { id, typeUser } = user;
    jwt.sign({ id, typeUser }, process.env.TOKEN_SECRET_KEY, (err, token) => {
      if (err) res.status(500).json({ error: err.message });

      res.status(200).json({ token: token, type: req.body.type });
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Getting signed in user
router.get("/getCurrentUser", validateToken, async (req, res) => {
  let user;
  user = await User.findOne({
    id: req.authData.id,
    typeUser: req.authData.typeUser
  });
  res.status(200).json(user);
});

router.post("/updateLocation", validateToken, async (req, res) => {
  let user;
  user = await User.findOne({
    id: req.authData.id,
    typeUser: req.authData.typeUser
  });
  user.location = req.body.user.location;
  user.save();
});

module.exports = router;
