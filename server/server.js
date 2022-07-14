const app = require('./app')
require('dotenv').config({path:"server/config/config.env"});
const PORT=process.env.PORT || 5000;
const cloudinary= require('cloudinary')

//handling uncaught exception

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('shutting down server due to uncaught error');
    process.exit(1);
})

const connectDb= require('./DB/mongo')

connectDb()

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME, 
    api_key:process.env.CLOUDINARY_KEY, 
    api_secret:process.env.CLOUDINARY_SECRET, 
})

const server= app.listen(PORT,()=>console.log(`server is running on port ${PORT}...`))

//unhandled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('shutting down server due to unhandled promise Rejetion error');
    server.close(()=>{
        process.exit(1);
    })
})