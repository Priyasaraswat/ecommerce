const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs=require("bcryptjs");
const jsonwebtoken=require("jsonwebtoken");
const crypto=require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter your name"],
    maxLength: [30, "Name cannot exceed 30 character"],
    minLength: [3, "Name should be greater than 3 characters"],
  },
    email: {
      type: String,
      required: [true, "Enter your email"],
      unique: true,
      validate: [validator.isEmail, "Enter valid email"],
    },
    password: {
      type: String,
      required: [true, "Enter your password"],
      minLength: [8,"Password should be greater than 7 characters"],
      select: false,
    },
    avatar: {
      publicId: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    createdAt:{
      type:Date,
      default:Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  
});

//user save hone se pehale yeh kaam hoga
//hum arrow function ke andar this use nhi kar sakate hai kiyukinuske andar this use nhi hoga
//10 character ka password hoga standard hai 10 jada nhi
// agar password change nhi hua toh toh ushe encrypt nhi karega
userSchema.pre("save",async function(next){
  if(!this.isModified("password")){
      next();
  }
  this.password= await bcryptjs.hash(this.password,10);
});

//jwt token
userSchema.methods.getJWTToken =function(){
  return jsonwebtoken.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
}

//compare password
userSchema.methods.comparePassword=async function(testPassword){
  return await bcryptjs.compare(testPassword,this.password)
}

//generating password reset token
userSchema.methods.getResetPasswordToken=function(){
  //generating token
  const resetToken=crypto.randomBytes(20).toString("hex");
  //buffer string ko string mein kar rhe hai agar string mein karenge without hex toh ajeeb si aayegi toh issiliye hex pass kiya hai

  //hashing and add to userSchema
  // sha256 is algo
  this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");

  this.resetPasswordExpire=Date.now()+40*60*1000;
  // 15 min*60 sec *1000 millisec

  return resetToken;


}

module.exports = mongoose.model("User", userSchema);

