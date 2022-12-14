const ErrorHander = require("../utils/errorhander");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
exports.isAuthenticatedUser = catchAsyncError(async(req, res, next)=>{
    const {token} = req.cookies;
    // console.log(token);
    if (!token) {
        return next(new ErrorHander("Please login to access this resource", 401));
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);
    next();
});