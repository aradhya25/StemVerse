const { body } = require("express-validator");

exports.createCourseValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("language")
    .trim()
    .notEmpty()
    .withMessage("Language is required"),
];

exports.updateCourseValidation = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty"),

  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty"),

  body("language")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Language cannot be empty"),
];