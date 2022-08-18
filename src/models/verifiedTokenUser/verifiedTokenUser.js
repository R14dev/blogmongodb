import mongoose from "mongoose";
export default mongoose.model('verifiedtokenuser', new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        ref: 'users',
        type: mongoose.Types.ObjectId,
        required: true
    },
    expireDate: {
        type: Date,
        required: true
    },
    createAt: {
        type: Date,
        required: true
    }
}, {timestamp: true}))
