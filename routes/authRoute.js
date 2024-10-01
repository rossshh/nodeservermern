const express=require('express');
const router=express.Router();
const {register,login,user, verifyOtp}=require('../controllers/authController');
const authMiddleware=require('../middlewares/auth-middleware');
const {signupSchema} =require('../models/user-model');

router.route('/register').post(register);
router.route('/verify-otp').post(verifyOtp);
router.route('/login').post(login);
router.route('/user').get(authMiddleware,user);

module.exports=router;