import mongoose from 'mongoose'

export default mongoose.model('articles',new mongoose.Schema({
        title:{
            type:String,
            required:[true,'title is required']
        },
        description:{
            type:String,
            required:[true,'description is required']},
        userId:{
            ref:'users',
            type:mongoose.Types.ObjectId,
            required:[true,'author is required']
        },
        views:{
            type:Number,
            required:false
        },
        createdAt:{
            type:Date,
            required:[true,'create_at is required']
        }
    },{timestamp:true}))