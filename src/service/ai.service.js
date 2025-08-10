const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});


async function generateCaption(base64ImageFile) {

  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: `you are an expert in genrating captions for images.
      You will be given an image and you have to generate a caption for it.
      The caption should be short and descriptive.
      you user hashtags and emojis in the caption.`,
    }
  });

  return response.text || "No caption generated";

}

module.exports = generateCaption;