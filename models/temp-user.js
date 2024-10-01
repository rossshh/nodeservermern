const mongoose = require('mongoose');

const tempSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    }
});

const TempUser=new mongoose.model("TempUser",tempSchema);
module.exports=TempUser;