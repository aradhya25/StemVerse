const { body } = require("express-validator");

exports.enrollmentValidation = [
  body("course_id")
    .notEmpty()
    .withMessage("Course ID is required"),
];
