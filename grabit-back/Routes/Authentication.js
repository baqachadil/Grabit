var express = require("express");
var router = express.Router();
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const validateToken = require("../Routes/TokenValidation");

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
      const { id } = user;
      jwt.sign({ id }, "Adil0122", (err, token) => {
        if (err) res.status(500).json({ error: err.message });

        res.status(200).json({ token: token, type: req.body.type });
      });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

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

    const { id } = user;
    jwt.sign({ id }, "Adil0122", (err, token) => {
      if (err) res.status(500).json({ error: err.message });

      res.status(200).json({ token: token, type: req.body.type });
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/getCurrentUser", validateToken, async (req, res) => {
  let user;
  user = await User.findOne({ id: req.authData.id });
  res.status(200).json(user);
});

module.exports = router;
