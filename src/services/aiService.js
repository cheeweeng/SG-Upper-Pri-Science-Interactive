import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  // We must explicitly configure this for browser usage, knowing the key is exposed
  dangerouslyAllowBrowser: true
});

const DEFAULT_MODEL = "openrouter/free";

export const aiService = {
  /**
   * Evaluates an open-ended response using OpenRouter
   */
  evaluateOpenEndedResponse: async (question, studentResponse) => {
    try {
      const completion = await openai.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: [
          {
            role: "system",
            content: `You are an expert Primary Science Teacher evaluating a student's answer. 
You will be provided a question, a rubric, and a sample answer. 
You must evaluate the student's response based on the rubric. 
Return ONLY JSON matching this format exactly: {"isCorrect": boolean, "score": number, "feedback": "string"}. 
Assign a score of 2 for a full correct answer covering both rubric points, 1 for partial, 0 for incorrect.`
          },
          {
            role: "user",
            content: `Question: ${question.text}
Rubric: ${question.rubric.join(", ")}
Sample Answer: ${question.sampleAnswer}

Student Response: "${studentResponse}"`
          }
        ],
        response_format: { type: "json_object" }
      });

      const result = JSON.parse(completion.choices[0].message.content);
      return result;
    } catch (error) {
      console.error("Failed to evaluate response", error);
      return { isCorrect: false, score: 0, feedback: "Error connecting to AI service. Please try again." };
    }
  },

  /**
   * Generates a personalized worksheet of questions using OpenRouter
   */
  generateWorksheet: async (themeId, currentProficiency, count = 3, level = 'Primary 4') => {
    try {
      // Determine target difficulty loosely based on proficiency
      let targetDifficulty = 'Medium';
      if (currentProficiency > 70) targetDifficulty = 'Hard';
      else if (currentProficiency < 40) targetDifficulty = 'Easy';

      const completion = await openai.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: [
          {
            role: "system",
            content: `You are an expert Singapore MOE curriculum developer. 
Your task is to generate a JSON response containing an array of Primary Science questions.
You must alternate between Multiple Choice Questions (type: "MCQ") and Open-Ended Questions (type: "OEQ").

JSON OUTPUT FORMAT MUST BE EXACTLY LIKE THIS:
{
  "questions": [
    // FOR MCQ:
    {
      "id": "unique-id-here",
      "theme": "Current Theme",
      "topic": "Specific Topic",
      "type": "MCQ",
      "difficulty": "Easy/Medium/Hard",
      "text": "The question text...",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Exact string of correct option",
      "explanation": "Why this is correct..."
    },
    // FOR OEQ:
    {
      "id": "unique-id-here",
      "theme": "Current Theme",
      "topic": "Specific Topic",
      "type": "OEQ",
      "difficulty": "Easy/Medium/Hard",
      "text": "The open ended question text...",
      "rubric": ["Key point 1 expected", "Key point 2 expected"],
      "sampleAnswer": "A model answer demonstrating the concepts"
    }
  ]
}`
          },
          {
            role: "user",
            content: `Please generate a worksheet with EXACTLY ${count} questions. 
Theme: ${themeId}
Grade Level: ${level}
Target Difficulty: ${targetDifficulty}

Mix the topics relevant to this theme appropriately for the grade level. Ensure the exact JSON format requested.`
          }
        ],
        response_format: { type: "json_object" }
      });

      const responseJSON = JSON.parse(completion.choices[0].message.content);
      return {
        worksheetId: crypto.randomUUID(),
        themeId,
        questions: responseJSON.questions,
        suggestedTime: count * 3 // roughly 3 mins per question
      };

    } catch (error) {
      console.error("Failed to generate worksheet", error);
      throw error;
    }
  }
};
