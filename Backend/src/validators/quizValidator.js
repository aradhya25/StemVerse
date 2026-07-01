const { body } = require("express-validator");

exports.quizValidation = [
  body("lesson_id").notEmpty(),
  body("title").notEmpty(),
  body("description").notEmpty(),
];

exports.questionValidation = [
  body("question").notEmpty(),
  body("option_a").notEmpty(),
  body("option_b").notEmpty(),
  body("option_c").notEmpty(),
  body("option_d").notEmpty(),
  body("correct_answer").isIn(["A", "B", "C", "D"]),
];