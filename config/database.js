const mongoose=require("mongoose");

mongoose.set("strictQuery", false);
const connectDatabase =async()=>
{
    await mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true,family: 4,}).then((data)=>{
        console.log(`Database connected !! `)
    })
   .catch((err)=>{
        console.log(err)
   })

}
module.exports = connectDatabase