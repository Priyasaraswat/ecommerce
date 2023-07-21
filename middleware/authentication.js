const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jsonwebtoken=require("jsonwebtoken");
const User = require("../models/user");

exports.isAuthenticatedUser =catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new ErrorHandler("Please login first",401))
    }
  const decodeddata=jsonwebtoken.verify(token,process.env.JWT_SECRET);

  // jo humne jwt token banate samay id daali thi woh nikal rhe hai
  req.user= await User.findById(decodeddata.id);
  // console.log(req.user);
  next();
})

exports.authorizeRole = (...role)=>{
  return (req,res,next)=>{
    if(!role.includes(req.user.role))
    {
       return  next(new ErrorHandler(`Role : ${req.user.role} is not allowed to access this resource`,403));
    }
    next();
  }
}