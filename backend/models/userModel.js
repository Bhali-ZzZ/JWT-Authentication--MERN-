import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : {type:String , required:true},
    email : {type:String , required:true},
    password : {type:String , required:true},
    image : {type:String},
    number : {type:String , required:true},
    location : {type:String , required:true},
})

const userModel = mongoose.models.user || mongoose.model('user',userSchema)

export default userModel