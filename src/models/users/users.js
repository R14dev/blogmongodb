import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    avatar:{type:String,required:false},
    verifiedUserEmail:{type:Boolean,required:true},
    createdAt:{type:Date,required:true}
},{timestamp:true})

export default mongoose.model('users',userSchema)