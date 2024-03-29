const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const errorMiddleware = require('./middleware/error');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
//Route imports
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

//Error middleware
app.use(errorMiddleware);

module.exports = app