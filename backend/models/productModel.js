const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:[true, "Please enter the name"],
        trim:true
    },
    description:{
        type:String,
        required:[true, "Please enter the description"]
    },
    price:{
        type:Number,
        required:[true, "Please enter the price"],
        maxLength:[8, "Cannot exceed 8 characters"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:[true, "Please enter the id"]
            },
            url:{
                type:String,
                required:[true, "Please enter the url"]
            }
        }
    ],
    category:{
        type:String,
        required:[true, "Please enter the category"]
    },
    Stock:{
        type:Number,
        maxLength:[4, "Stock cannot exceed 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Product", productSchema)