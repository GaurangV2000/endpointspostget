const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

require("../DB/conn");
const User = require("../model/userSchema");
const { schema } = require("../model/userSchema");
const res = require("express/lib/response");

// to post data from data base

router.post("/addData", async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(422).json({ error: "Plz fill all the details" });
  }

  try {
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ error: "EMAIL ALREADY EXISTS" });
    } else {
      const user = new User({ name, email, phone });

      await user.save();

      res.status(201).json({ message: "user registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//to get the data from database

//using fat arrow function

router.get("/getData", (req, res) => {
  let users = User.find({}, (err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

// using normal function

// router.get("/", function (req, res) {
//   let users = User.find({}, function (err, users) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(users);
//     }
//   });
// });

module.exports = router;
