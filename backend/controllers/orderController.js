const Order = require('../models/orderModel');
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHander = require('../utils/errorhander');
const ApiFeature = require('../utils/apifeatures');
const Product = require('../models/productModel');

//Creating a new order
exports.newOrder = catchAsyncError( async(req, res, next) => {
    const {name, shippingInfo, orderItems, price, paymentInfo, taxPrice, shippingPrice, totalPrice} = req.body;
    const order = await Order.create({
        name, shippingInfo, orderItems, price, paymentInfo, taxPrice, shippingPrice, totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(201).json({
        sucess:true,
        order
    });
});

//get logged in user orders
exports.getSingleOrder = catchAsyncError( async(req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(!order) {
        return next( new ErrorHander('Order not found with this ID', 404));
    }
    res.status(200).json({
        sucess:true,
        order
    });
});

//get logged in user orders
exports.myOrders = catchAsyncError( async(req, res, next) => {
    const orders = await Order.find({user:req.user._id});

    res.status(200).json({
        sucess:true,
        orders
    });
});

//Get all orders - ADMIN
exports.getAllOrders = catchAsyncError( async(req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach(order => totalAmount += order.totalPrice);

    res.status(200).json({
        sucess:true,
        totalAmount,
        orders
    });
});

//Update Order status --Admin
exports.updateOrder = catchAsyncError( async(req, res, next) => {
    const order = await Order.findById(req.params._id);
    if (order.status === "Delivered") {
        return next(new ErrorHander("You have already delivered this product", 400));
    }
    order.orderItems.forEach( async(order) => {
        await updateStock(order.product, order.quantity)
    });

    order.status = req.body.status;
    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }
    await order.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
        order
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    if (!product) {
        return next(new ErrorHander("Product does not exist with this id", 400));
    }
    product.stock-=quantity;

    await product.save({validateBeforeSave:false});
}

//Delete Order --ADMIN
exports.deleteOrder = catchAsyncError( async(req, res, next) => {
    const order = await Order.findById(req.params.id);
    if(!order) {
        return next(new ErrorHander("Order not found", 400)); 
    }
    await order.remove();

    res.status(200).json({
        success:true,
    });
});

