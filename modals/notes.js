const mongoose=require("mongoose")

const crud_sch=new mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    discription:
    {
        type:String,
        required:true
    },
    title:
    {
        type:String,
        required:true
    }
})
module.exports=mongoose.model('dbcrud',crud_sch)