import mongoose from "mongoose";
export default mongoose.model('users', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    verifiedUserEmail: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
}, {timestamp: true}))
