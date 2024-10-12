const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');

const model = new ChatGoogleGenerativeAI({
  model: 'gemini-pro',
  maxOutputTokens: 2048,
});

const getPrReview = async (prData) => {
  try {
    const response = await model.invoke(prData);

    return response.content;
  } catch (error) {
    return error.message;
  }
};

module.exports = getPrReview;
