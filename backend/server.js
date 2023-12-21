const app = require('./app')

const dotenv = require('dotenv')
const connectDataBase = require("./config/dataBase")
const cloudinary = require("cloudinary")

//Handling uncaught exception
process.on("uncaughtException", (err) => {
    // console.log(`Error: , ${err.message}`);
    console.log(`Shutting down server due to unhandled promise rejection`);
    process.exit(1);
})

//config file
dotenv.config({ path: "backend/config/config.env" });
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
//Calling the function to connect the database
connectDataBase();
const server = app.listen(4000, ()=>{
    console.log(`The server has started at http://localhost/4000`);
})

process.on("unhandledRejection", (err) => {
    console.log(`Error: , ${err.message}`);
    console.log(`Shutting down server due to unhandled promise rejection`);
    server.close(() => {
        process.exit(1);
    });
})