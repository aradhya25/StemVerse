const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validate = require("../middleware/validationMiddleware");

const { aiValidation } = require("../validators/aiValidator");

const {
  generateQuiz,
} = require("../controllers/aiController");

router.post(
  "/generate-quiz",
  authMiddleware,
  roleMiddleware("teacher"),
  aiValidation,
  validate,
  generateQuiz
);

module.exports = router;