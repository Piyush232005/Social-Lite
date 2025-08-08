const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    image: String,
    caption: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to User model
    }

})

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;