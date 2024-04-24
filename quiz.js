const quizContainer = document.getElementById('quiz-container');
const submitButton = document.getElementById('submit-btn');

npm install @google-cloud/vertexai
gcloud auth application-default login

const {VertexAI} = require('@google-cloud/vertexai');

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({project: 'sigma-outcome-412817', location: 'us-central1'});
const model = 'gemini-1.5-pro-preview-0409';

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    'maxOutputTokens': 8192,
    'temperature': 1,
    'topP': 0.95,
  },
  safetySettings: [
    {
        'category': 'HARM_CATEGORY_HATE_SPEECH',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
        'category': 'HARM_CATEGORY_DANGEROUS_CONTENT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
        'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
        'category': 'HARM_CATEGORY_HARASSMENT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    }
  ],
});

const text1_1 = {text: `Create a 3 question multiple-choice quiz on financial literacy. Ask one question at a time. Each question should have only one correct answer out of 4 choices, each in a separate line. Store the responses and provide a score at the end. If the answer is wrong, provide the right answer, and an explanation. Move to the next question after the helpful remark. Be friendly and encouraging even when the answers are wrong.`};

const chat = generativeModel.startChat({});

async function sendMessage(message) {
  const streamResult = await chat.sendMessageStream(message);
  process.stdout.write('stream result: ' + JSON.stringify((await streamResult.response).candidates[0].content) + '\n');
}

async function generateContent() {
  await sendMessage([
    text1_1
  ]);
  await sendMessage([
    {text: `b`}
  ]);
  await sendMessage([
    {text: `d`}
  ]);
  await sendMessage([
    {text: `A`}
  ]);
}

generateContent();
