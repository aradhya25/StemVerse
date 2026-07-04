const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validate = require("../middleware/validationMiddleware");


const {
  aiValidation,
} = require("../validators/aiValidator");

const {
  generateQuiz,
  generateLessonSummary,
  
} = require("../controllers/aiController");
router.post("/generate-summary", authMiddleware, generateLessonSummary);
router.post(
  "/generate-quiz",
  authMiddleware,
  roleMiddleware("teacher"),
  aiValidation,
  validate,
  generateQuiz,
);
// router.post(
//   "/explain-answer",
//   authMiddleware,
//   explainAnswerValidation,
//   validate,
//   explainAnswer
// );
module.exports = router;
