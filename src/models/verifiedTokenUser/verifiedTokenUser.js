import mongoose from "mongoose";
const schema = mongoose.Schema({
    token:{type:String,required:true},
    userId:{ref:'users',type:mongoose.Types.ObjectId,required:true},
    expireDate:{type:Date,required:true},
    createAt:{type:Date,required:true},
},{timestamp:true})

export default mongoose.model('verifiedtokenuser',schema)