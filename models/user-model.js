const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

const signupSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});
//JSON WEB TOKEN
signupSchema.methods.generateToken=async function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },
            process.env.SECRET_KEY,
        {
            expiresIn:'30d',
        }
    )
    } catch (error) {
        
    }
}

const User=new mongoose.model("User",signupSchema);

module.exports=User;