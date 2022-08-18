import mongoose from 'mongoose'
export default mongoose.model('token', new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    expireDate: {
        type: Date,
        required: true
    },
    userId: {
        ref: 'users',
        type: mongoose.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
}, {timestamp: true}))
