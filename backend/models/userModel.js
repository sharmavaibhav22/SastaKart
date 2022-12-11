const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter user name"],
        maxLength:[30, "Name cannot exceed 30 characters"],
        minLength:[4, "Name should be atleast 4 characters"]
    },
    email:{
        type:String,
        required:[true, "Please enter user name"],
        unique:true,
        validate:[validator.isEmail, "Please enter valid email"]
    },
    password:{
        type:String, 
        required:[true, "Please enter password"],
        minLength:[8, "Password should be 8 characters"],
        select:false
    },
    avtar:{
        public_id:{
            type:String,
            required:[true, "Please enter the id"]
        },
        url:{
        type:String,
        required:[true, "Please enter the url"]
        }
    },
    role:{
        type:String,
        default:"user",
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date
});

userSchema.pre('save', async function(next){

    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

//JWT Token
userSchema.methods.getJWTToken = function() {
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRE,
    });
};

//comaring password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


module.exports = mongoose.model("User",userSchema);