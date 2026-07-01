const { body } = require("express-validator");

exports.youtubeValidation = [
  body("videoUrl")
    .isURL()
    .withMessage("Invalid YouTube URL")
];