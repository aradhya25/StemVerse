const { body } = require("express-validator");

exports.quizValidation = [
  body("lesson_id").notEmpty(),
  body("title").notEmpty(),
  body("description").notEmpty(),
  body("time_limit")
  .isInt({ min: 1 })
  .withMessage("Time limit must be at least 1 minute"),

body("passing_score")
  .isInt({ min: 0, max: 100 })
  .withMessage("Passing score must be between 0 and 100"),
];

exports.questionValidation = [
  body("question").notEmpty(),
  body("option_a").notEmpty(),
  body("option_b").notEmpty(),
  body("option_c").notEmpty(),
  body("option_d").notEmpty(),
  body("correct_answer").isIn(["A", "B", "C", "D"]),
];
