const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  submitQuiz,
  getMyAttempts,
} = require("../controllers/quizAttemptController");

router.post(
  "/:quizId/submit",
  authMiddleware,
  submitQuiz
);

router.get(
  "/my-attempts",
  authMiddleware,
  getMyAttempts
);

module.exports = router;