import mongoose from 'mongoose'
export default mongoose.model('images', 
    new mongoose.Schema({
    images: {
        type: String,
        required: [true, 'images is required !']
    },
    articleID: {
        ref: 'articles',
        type: mongoose.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
}, {timestamp: true}))
