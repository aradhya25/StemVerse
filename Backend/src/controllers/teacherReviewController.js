const {
  getTeacherReviews,
} = require("../models/teacherReviewModel");

exports.getReviews = async (req, res) => {
  try {
    const reviews = await getTeacherReviews(req.user.id);

    res.json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};