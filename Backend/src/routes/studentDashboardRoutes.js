const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const {
  studentDashboard,

  continueLearning,

  recentAttempts,
} = require("../controllers/studentDashboardController");

router.get(
  "/",

  authMiddleware,

  roleMiddleware("student"),

  studentDashboard,
);

router.get(
  "/continue-learning",

  authMiddleware,

  roleMiddleware("student"),

  continueLearning,
);

router.get(
  "/recent-attempts",

  authMiddleware,

  roleMiddleware("student"),

  recentAttempts,
);

module.exports = router;
