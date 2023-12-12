const mongoose = require('mongoose')


//Connecting mongoDb
const connectDataBase = () => {
    
mongoose.connect("mongodb://localhost:27017/Ecommerce", {}).then((data)=>{
    console.log(`MongoDB connected with server:${data.connection.host}`);
}).catch((err)=>{
    console.log(err);
})
}

module.exports = connectDataBase;