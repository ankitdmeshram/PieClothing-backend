const bcrypt = require("bcrypt");
//const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    let { firstName, lastName, phone, email, password, AccountType } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }

    let hashedpassword;
    try {
      hashedpassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "error in hashing password",
      });
    }

    if (AccountType == null) {
      AccountType = "user";
    }

    const user = await User.create({
      firstName,
      lastName,
      phone,
      email,
      password: hashedpassword,
      AccountType,
    });

    return res.status(200).json({
      success: true,
      message: "user create successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "user can not create",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill all the details",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "please enter the valid email",
      });
    }
    const payload = {
      email: user.email,
      id: user._id,
      role: user.AccountType,
    };

    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      userDetails = user.toObject();
      userDetails.token = token;
      userDetails.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        userDetails,
        message: "user logged in successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "password not match",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "login failure",
    });
  }
};
