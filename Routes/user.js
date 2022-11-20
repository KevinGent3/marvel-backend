const express = require("express");
const router = express.Router();

const User = require("../Models/User");

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
router.post("/user/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const userToFind = await User.findOne({ email: email });

    if (username && password) {
      if (!userToFind) {
        const salt = uid2(16);

        const hash = SHA256(password + salt).toString(encBase64);

        const token = uid2(64);

        const newUser = new User({
          email: email,
          username: username,
          token: token,
          hash: hash,
          salt: salt,
        });

        await newUser.save();

        res.status(200).json({
          _id: newUser._id,
          token: token,
          username: username,
        });
      } else {
        res.status(409).json({ message: "This email already exists." });
      }
    } else {
      res.status(400).json({ message: "Some parameters are missing." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userToFind = await User.findOne({ email: email });

    if (email && password && userToFind) {
      const newHash = SHA256(password + userToFind.salt).toString(encBase64);

      if (userToFind.hash === newHash) {
        res.status(200).json({
          _id: userToFind._id,
          token: userToFind.token,
          username: userToFind.username,
        });
      } else {
        res.status(400).json({ message: "Unauthorized." });
      }
    } else {
      res.status(400).json({ message: "Unauthorized." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
