const postModel = require('../models/post.model');
const generateCaption = require('../service/ai.service');
const uploadfile = require('../service/storage.service');
const { v4: uuidv4 } = require('uuid');

async function createPostController(req, res) {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                message: 'No file uploaded'
            });
        }

        console.log("File received:", file);

        const base64ImageFile = Buffer.from(file.buffer).toString('base64');

        const caption = await generateCaption(base64ImageFile);

        const result = await uploadfile(file.buffer, `${uuidv4()}`);

        const post = await postModel.create({
            caption: caption,
             image: result.url,
            user: req.user._id,
        });

        return res.status(201).json({
            message: 'Post created successfully',
            post
        });

    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({
            message: 'Error creating post',
            error: error.message
        });
    }
}

module.exports = {
    createPostController
}