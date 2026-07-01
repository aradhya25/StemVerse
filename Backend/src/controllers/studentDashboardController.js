const {
  getStudentDashboard,

  getContinueLearning,

  getRecentAttempts,
} = require("../models/studentDashboardModel");

exports.studentDashboard = async (req, res) => {
  try {
    const dashboard = await getStudentDashboard(req.user.id);

    if (dashboard) {
      dashboard.enrolled_courses = Number(dashboard.enrolled_courses);
      dashboard.completed_lessons = Number(dashboard.completed_lessons);
      dashboard.pending_lessons = Number(dashboard.pending_lessons);
      dashboard.average_score = Number(dashboard.average_score);
    }

    res.status(200).json({
      success: true,
      dashboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.continueLearning = async (req, res) => {
  try {
    const courses = await getContinueLearning(req.user.id);

    res.status(200).json({
      success: true,

      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

exports.recentAttempts = async (req, res) => {
  try {
    const attempts = await getRecentAttempts(req.user.id);

    res.status(200).json({
      success: true,

      attempts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
