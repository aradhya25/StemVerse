const { v4: uuidv4 } = require("uuid");

const {
  addReview,
  getCourseReviews,
  updateReview,
  deleteReview,
  getAverageRating,
  isUserEnrolled,
} = require("../models/reviewModel");

exports.addReview = async (req, res) => {
  try {

    const {
      course_id,
      rating,
      review,
    } = req.body;

    // Check enrollment
    const enrolled = await isUserEnrolled(
      req.user.id,
      course_id
    );

    if (!enrolled) {
      return res.status(403).json({
        success: false,
        message: "You must enroll in this course before reviewing it.",
      });
    }

    const newReview = await addReview(
      uuidv4(),
      req.user.id,
      course_id,
      rating,
      review
    );

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review: newReview,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.getCourseReviews = async (req, res) => {
  try {

    const reviews = await getCourseReviews(req.params.courseId);

    const average = await getAverageRating(req.params.courseId);

    res.status(200).json({
      success: true,
      average,
      reviews,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.updateReview = async (req, res) => {
  try {

    const { rating, review } = req.body;

    const updated = await updateReview(
      req.params.reviewId,
      rating,
      review
    );

    res.status(200).json({
      success: true,
      review: updated,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.deleteReview = async (req, res) => {
  try {

    await deleteReview(req.params.reviewId);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};