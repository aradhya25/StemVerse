const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");
const { enrollmentValidation } = require("../validators/enrollmentValidator");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  enroll,
  myCourses,
  unenroll,
} = require("../controllers/enrollmentController");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("student"),
  enrollmentValidation,
  validate,
  enroll
);

router.get(
  "/my-courses",
  authMiddleware,
  myCourses
);

router.delete(
  "/:courseId",
  authMiddleware,
  unenroll
);

module.exports = router;