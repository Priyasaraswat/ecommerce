const app=require("./app");
const dotenv=require("dotenv");
const connectDatabase=require("./config/database");
const cloudinary=require("cloudinary");
const path=require("path");
const express=require("express");

//handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(err.message);
    console.log("Server is shutting down due to uncaught exception");
    process.exit(1);
})

//providing the path for env variables
dotenv.config({path:"config/config.env"})

// connecting to database

connectDatabase();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const __dirname1=path.resolve();
console.log(__dirname1);
console.log(path.resolve(__dirname1,"frontend", "build", "index.html"))

 if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

 app.get("*", (req, res) =>
   
    res.sendFile(path.resolve(__dirname1,"frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

const server= app.listen(process.env.PORT,()=>
{
    console.log(`Server is running at https://localhost:${process.env.PORT}`)
})

//unhandled promise rejection eg: mongodb ka url galat tha
process.on("unhandledRejection",err=>{
    console.log(`Error ${err.message}`);
    console.log("Server is shutting down due to unhandled promise rejection");
    server.close(()=>{
        process.exit(1);
    })
})
