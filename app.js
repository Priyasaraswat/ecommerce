const cookieParser = require("cookie-parser");
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const errorMiddleware=require("./middleware/error");
const fileUpload=require("express-fileupload");
const dotenv=require("dotenv");
const path=require("path");


//providing the path for env variables
dotenv.config({path:"backend/config/config.env"})

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

//Route imports
const productRoute=require("./routes/productRoute");
const userRoute=require("./routes/userRoute");
const orderRoute=require("./routes/orderRoute");
const paymentRoute=require("./routes/paymentRoute");

app.use("/api/v1",productRoute);
app.use("/api/v1",userRoute);
app.use("/api/v1",orderRoute);
app.use("/api/v1",paymentRoute);

//middleware for error
app.use(errorMiddleware);


module.exports=app