const { body } = require("express-validator");

exports.aiValidation = [
  body("quiz_id")
    .notEmpty()
    .withMessage("Quiz ID is required"),

  body("topic")
    .notEmpty()
    .withMessage("Topic is required"),

  body("difficulty")
    .isIn(["Easy", "Medium", "Hard"])
    .withMessage("Difficulty must be Easy, Medium, or Hard"),

  body("numberOfQuestions")
    .isInt({ min: 1, max: 30 })
    .withMessage("Number of questions must be between 1 and 30"),
];
// exports.explainAnswerValidation = [

//   body("question")
//     .notEmpty()
//     .withMessage("Question is required"),

//   body("option_a")
//     .notEmpty(),

//   body("option_b")
//     .notEmpty(),

//   body("option_c")
//     .notEmpty(),

//   body("option_d")
//     .notEmpty(),

//   body("correct_answer")
//     .notEmpty(),

//   body("student_answer")
//     .notEmpty()

// ];