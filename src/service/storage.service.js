const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadfile(file,filename){
    try {
        const response = await imagekit.upload({
            file: file, // required
            fileName: filename,
            folder: "Social-lites" // required
        })
        return response;
    } catch (error) {
        console.error("ImageKit upload error:", error);
        throw new Error(`Failed to upload file: ${error.message}`);
    }
}

module.exports = uploadfile;