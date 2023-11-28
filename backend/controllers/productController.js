const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeature = require("../utils/apifeatures");

// Creating a product
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Get all the products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  //product count to be shown in frontend.
  const productCount = await Product.countDocuments(); 
  const apiFeature = new ApiFeature(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
  });
});

// GET product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
    productCount,
  });
});

//updating the products
exports.updateProduct = catchAsyncError(async (req, res) => {
  let product = Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Prodcut not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "Product deleted successfully.",
  });
});

//Adding Reviews or updating reviews
exports.createProductReview = catchAsyncError( async(req, res, next) => {
  const {rating, comment, productId} = req.body;

  const review = {
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment
  }
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(key => req.user._id === key.user._id);
  if (isReviewed){
    product.reviews.forEach(element => {
      if(req.user._id === element.user._id){
        element.rating = rating;
        element.comment = comment;
      }
    });
  } else{
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  };

  //Average rating
  let sum = 0;
  product.ratings = product.reviews.forEach(key => sum = sum + key.rating) / product.reviews.length;
  await product.save({validateBeforeSave:false});

  res.status(200).json({
    success:true
  });
});

//Get all reviews
exports.getReviews = catchAsyncError( async(req, res, next) => {
  const product = await Product.findById(req.query.id);
  if(!product){
    return next(new ErrorHander("Product not found", 404));
  }
  res.status(200).json({
    success:true,
    reviews:product.reviews
  });
});

//Delete Reviews
exports.deleteReview = catchAsyncError( async(req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if(!product){
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(key => key._id.toString() !== req.query.id.toString());

  const numOfReviews = reviews.length;

  let sum = 0;
  const ratings = product.reviews.array.forEach(element => {
    sum = sum + element.rating;
  })/numOfReviews;

  product.reviews = reviews;

  await product.findByIdAndUpdate(req.query.productId, {ratings, numOfReviews, reviews}, {new:true, runValidators:true, useFindAndModify:false});

  res.status(200).json({
    success:true,
  });

});