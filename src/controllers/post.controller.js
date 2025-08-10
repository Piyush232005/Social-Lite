const postModel = require('../models/post.model');
const generateCaption = require('../service/ai.service');



async function createPostController(req, res) {
    const file = req.file;

    console.log("File received:", file);

    const base64ImageFile = new Buffer.from(file.buffer).toString('base64');

    const caption = await generateCaption(base64ImageFile);

    res.json({
        message: 'Post created successfully',
        caption: caption
    });

}

module.exports = {
    createPostController
}