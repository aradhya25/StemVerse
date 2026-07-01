const { body } = require("express-validator");

exports.progressValidation = [
  body("lesson_id")
    .notEmpty()
    .withMessage("Lesson ID is required"),

  body("watch_time")
  .optional()
  .isInt({ min: 0 })
  .withMessage("Watch time must be a non-negative integer"),

  body("completed")
    .isBoolean()
    .withMessage("Completed must be true or false"),
];
