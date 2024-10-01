const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
const TempUser=require('../models/temp-user');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "User Already Exists" });

    } else {
      const otp = Math.floor(100000 + Math.random() * 900000);

      // Store the password temporarily
      const tempUser = await TempUser.create({ name, email, password, otp });
      // Send OTP to user email
      let testAccount = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'roshanvats2003@gmail.com',
          pass: 'wdcl ntpg ymry maua'
        }
      });

      const info = await transporter.sendMail({
        from: '"Roshan Kumar Jha" <roshanvats2003@gmail.com>',
        to: email,
        subject: "OTP Verification",
        text: `Your Otp for Verification is ${otp}`,
      });

      // Wait for OTP verification
      return res.status(200).json({
        msg: 'OTP sent to your email. Please verify your account.',
        otp,
        email
      });
    }
  } catch (error) {
    console.log("Registration Not Valid");
    return res.status(500).json({ msg: "Registration Not Valid" });
  }
};
const verifyOtp = async (req,res) => {
  try {
    const { otp } = req.body;
    console.log('Received OTP:', otp);
    // Retrieve the temporary user
    const tempUser = await TempUser.findOne({ otp });
    console.log('Retrieved temporary user:', tempUser);
    // Verify OTP
    if(!tempUser)
    {
        return res.status(404).json({ msg: "Invalid OTP" });
    }
    else{
      const saltRound = await bcrypt.genSalt(10);
      const hash_password = await bcrypt.hash(tempUser.password, saltRound);
      const userCreated = await User.create({ name: tempUser.name, email:tempUser.email, password: hash_password });
      console.log(userCreated);

      // Remove the temporary user
      await TempUser.deleteOne({ email:tempUser.email });

      return res.status(200).json({
        data: userCreated,
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
        msg: 'Registration successful'
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error verifying OTP" });
  }
};

const login = async (req,res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      const isMatch = await bcrypt.compare(password, userExist.password);
      if (isMatch) {
        return res.status(200).json({ 
          data: userExist,
          token:await userExist.generateToken(),
          userId:userExist._id.toString()
        });
      } else {
        return res.status(500).json({ msg: "Invalid Credentials" });
      }
    }
  } catch (error) {
    return res.status(401).json({ msg: "Login Function Error" });
  }
};

const user=(req,res)=>{
  try {
    const userData=req.user;
    console.log(userData);
    return res.status(200).json({userData});

  } catch (error) {
    console.error(error);
  }
}

module.exports = { register, login, user, verifyOtp};
