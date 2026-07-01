const model = require("../services/aiService");
const { v4: uuidv4 } = require("uuid");

const {
  addQuestion,
  getQuizWithTeacher,
} = require("../models/quizModel");

exports.generateQuiz = async (req, res) => {
  try {
    const {
      quiz_id,
      topic,
      difficulty,
      numberOfQuestions,
    } = req.body;

    // Validate input
    if (!quiz_id || !topic || !difficulty || !numberOfQuestions) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check quiz ownership
    const quiz = await getQuizWithTeacher(quiz_id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    if (quiz.created_by !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to modify this quiz",
      });
    }

    const prompt = `
Generate ${numberOfQuestions} multiple choice questions.

Topic: ${topic}

Difficulty: ${difficulty}

Rules:
1. Return ONLY a valid JSON array.
2. Do not use markdown.
3. Do not use \`\`\`json.
4. Do not add explanations.
5. Each question must have exactly four options.
6. Correct answer must be only A, B, C or D.

Format:

[
  {
    "question":"",
    "option_a":"",
    "option_b":"",
    "option_c":"",
    "option_d":"",
    "correct_answer":"A"
  }
]
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response.text();

    // Remove markdown if Gemini returns it
    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const questions = JSON.parse(cleanText);

    if (!Array.isArray(questions)) {
      return res.status(400).json({
        success: false,
        message: "Invalid AI response",
      });
    }

    let inserted = 0;

    for (const q of questions) {

      if (
        !q.question ||
        !q.option_a ||
        !q.option_b ||
        !q.option_c ||
        !q.option_d ||
        !q.correct_answer
      ) {
        continue;
      }

      await addQuestion(
        uuidv4(),
        quiz_id,
        q.question,
        q.option_a,
        q.option_b,
        q.option_c,
        q.option_d,
        q.correct_answer
      );

      inserted++;
    }

    res.status(201).json({
      success: true,
      message: "Quiz generated successfully",
      totalQuestions: inserted,
      questions,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};