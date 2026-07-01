const { body } = require("express-validator");
exports.reviewValidation = [
  body("course_id").notEmpty(),

  body("rating").isInt({ min: 1, max: 5 }),

  body("review").notEmpty(),
];
