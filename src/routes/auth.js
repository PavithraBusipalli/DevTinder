const express = require("express");
const router = express.Router();
const { userAuth } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { validateSignUpData } = require("../utils/validation");

router.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { password, firstName, lastName, email } = req.body;
    const hashPswd = await bcrypt.hash(password, 10);
    req.body.password = hashPswd;
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPswd,
    });
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    console.log("Error");
    res.status(404).send("Error: " + err);
  }
});

// Login API
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (isPassword) {
      // // Create a JWT Token
      // const token = await jwt.sign({_id: user._id}, "DevTinder@2024", {expiresIn: '1m'});
      const token = await user.getJWT();
      // Attaching token to cookie
      res.cookie("token", token);
      res.send("Login Successful!!");
    } else {
      throw new Error("Invalid Credentials!");
    }
  } catch (e) {
    res.status(400).send("ERROR : " + e.message);
  }
});

router.post('/logout', async (req, res) => {
    // res.cookie('token', null, {
    //     expires: new Date(Date.now()),
    // });
    // res.send("Logout Success!");
    res.cookie('token', null, {
        expires: new Date(Date.now())
    })
    .send("Logout Success!");
})
module.exports = {
  authRouter: router,
};
