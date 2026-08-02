const mongoose = require("mongoose");
const Chat= require("./model/firstmodel");

// Database connection
main()
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((err) => {
    console.log("Error occurred in the database:", err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatapp");
}

let allChat=[{
  from:"khesarilal yadav",
  to:"raju khushuwaha",
  msg:"hii raju kaise ho",
  create_at:new Date
},
{
  from:"pawan",
  to:"khesarilal yadav",
  msg:"hii khesari bhai kaise ho",
  create_at:new Date
}]
Chat.insertMany(allChat)
.then(res=>{
  console.log("result",res)
})
.catch(err=>{
  console.log("error occur")
})