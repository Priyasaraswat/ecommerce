const mongoose=require("mongoose");

mongoose.set("strictQuery", false);
const connectDatabase =()=>
{
    mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
        console.log(`Database connected !! ${data.connection.host}`)
    })
   .catch((err)=>{
        console.log(err)
   })

}
module.exports = connectDatabase