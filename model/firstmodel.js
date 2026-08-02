const mongoose=require("mongoose");
const Chatschema=new mongoose.Schema({
    from:{
        type:String,
        require:true
    },
    to:{
        type:String,
    },
    msg:{
        type:String
    },
    create_at:{
        type:Date,
        default:new Date
    }
})
const Chat=mongoose.model("Chat",Chatschema);
module.exports=Chat;