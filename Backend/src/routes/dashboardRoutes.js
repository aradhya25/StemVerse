const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const {
  teacherDashboard,
  recentCourses,
  recentEnrollments,
  topCourses,
  quizPerformance,
  recentLessons,
} = require("../controllers/dashboardController");

router.get(
  "/teacher",

  authMiddleware,

  roleMiddleware("teacher"),

  teacherDashboard,
);

router.get(
  "/recent-courses",
  authMiddleware,
  roleMiddleware("teacher"),
  recentCourses,
);
router.get(
  "/recent-lessons",
  authMiddleware,
  roleMiddleware("teacher"),
  recentLessons
);

router.get(
  "/recent-enrollments",
  authMiddleware,
  roleMiddleware("teacher"),
  recentEnrollments,
);

router.get(
  "/top-courses",
  authMiddleware,
  roleMiddleware("teacher"),
  topCourses,
);

router.get(
  "/quiz-performance",
  authMiddleware,
  roleMiddleware("teacher"),
  quizPerformance,
);
module.exports = router;
