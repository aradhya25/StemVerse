exports.questionValidation = [
  body("question").notEmpty(),

  body("option_a").notEmpty(),

  body("option_b").notEmpty(),

  body("option_c").notEmpty(),

  body("option_d").notEmpty(),

  body("correct_answer").isIn(["A", "B", "C", "D"]),
];
