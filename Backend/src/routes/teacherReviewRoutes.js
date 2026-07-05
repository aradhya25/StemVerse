const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getReviews,
} = require("../controllers/teacherReviewController");

router.get(
  "/",
  authMiddleware,
  roleMiddleware("teacher"),
  getReviews
);

module.exports = router;