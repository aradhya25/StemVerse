const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");
const { uuidValidation } = require("../validators/uuidValidator");

const {
  addReview,
  getCourseReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const { reviewValidation } = require("../validators/reviewValidator");
const validate = require("../middleware/validationMiddleware");

router.post(
  "/",
  authMiddleware,
  reviewValidation,
  validate,
  addReview
);

router.get(
  "/:courseId",
  getCourseReviews
);

router.put(
  "/:reviewId",
  authMiddleware,
  uuidValidation("reviewId"), // or uuidValidation() depending on your implementation
  reviewValidation,
  validate,
  updateReview
);

router.delete(
  "/:reviewId",
  authMiddleware,
  uuidValidation("reviewId"), // or uuidValidation()
  validate,
  deleteReview
);

module.exports = router;