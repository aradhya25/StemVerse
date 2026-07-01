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
