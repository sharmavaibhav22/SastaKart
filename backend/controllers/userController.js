const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHander = require("../utils/errorhander");
const sendToken = require('../utils/jwtToken');
//Registering a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avtar: {
      public_id: "this is sample id",
      url: "profilepictureurl",
    },
  });
  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHander("Please enter email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password"));
  }

  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 200, res);

});

exports.logoutUser = catchAsyncError(async(req, res, next)=>{
  req.cookies("token", null,{
    expires:new Date(Date.now),
    httpOnly:true
  })
  res.send(200).json({
    success:true,
    message:"Logged out"
  });
});
