import mongoose from 'mongoose'
export default mongoose.model('comment', new mongoose.Schema({
    comment: {
        type: String,
        required: [true, 'comment is required !']
    },
    articleID: {
        ref: 'articles',
        type: mongoose.Types.ObjectId,
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
