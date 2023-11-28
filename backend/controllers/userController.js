const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHander = require("../utils/errorhander");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
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

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
  const message = `Your password reset token is as follow:\n\n${resetPasswordUrl}\n\nIf you have not requested this email, then ignore it.`;
  try {
    await sendEmail({
      email: user.email,
      subject: "SastaKart Password Reset",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHander(error.message, 500));
  }
  res.status(200).json({
    success: true,
    resetToken,
  });
});


exports.resetPassword  = catchAsyncError(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if(!user) {
    return next(new ErrorHander("Password reset token is invalid or has been expired", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);

});

//Getting User Details
exports.getUserDetails = catchAsyncError( async(req, res, next) => {
  const user = await User.findById(req.user.id);

  if(!user) {
    return next(new ErrorHander("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user
  });
});

//Update User Password
exports.updatePassword = catchAsyncError( async(req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = user.comparePassword(req.body.oldPassword);

  if(!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if(req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not match", 400));
  }

  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

//Update User profile
exports.updateUserDetails = catchAsyncError( async(req, res, next) => {
  const updateUserObj = {
    name:req.body.name,
    email:req.body.email,
  }
  //will add cloudinary later
  const user = await User.findByIdAndUpdate(req.user.id, updateUserObj, {
    new:true,
    runValidators:true,
    useFindAndModify:false
  });
  res.status(200).json({
    success: true,
    user
  });
});

/*All the user accessed by admin */
//Get all users
exports.getAllUsers = catchAsyncError( async(req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users
  });
});

//Get User details by id
exports.getSingleUser = catchAsyncError( async(req, res, next) => {
  const user = await User.findById(req.params._id);

  if(!user) {
    return next(new ErrorHander("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user
  });
});

//Update user role --admin
exports.updateUserRole = catchAsyncError( async(req, res, next) => {
  const updateUserObj = {
    name:req.body.name,
    email:req.body.email,
    role:req.body.role
  }
  //will add cloudinary later
  const user = await User.findByIdAndUpdate(req.params._id, updateUserObj, {
    new:true,
    runValidators:true,
    useFindAndModify:false
  });
  res.status(200).json({
    success: true,
    user
  });
});

//Deleting a user
exports.deleteUser = catchAsyncError( async(req, res, next) => {
  console.log(req);
  const user = await User.findById(req.params._id);
  console.log(req.params.id);
  //will remove cloudinary later
  if(!user) {
    return next(new ErrorHander("User not found", 404));
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted successfully"
  });
});

