const {
  getTeacherDashboard,
  getRecentCourses,
  getRecentEnrollments,
  getTopCourses,
  getQuizPerformance,
  getRecentLessons,
} = require("../models/dashboardModel");

exports.teacherDashboard = async (req, res) => {
  try {
    const dashboard = await getTeacherDashboard(req.user.id);

    res.status(200).json({
      success: true,
      dashboard,
    });

  } catch (error) {
    console.error(error); // <-- Add this

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.recentCourses = async (req, res) => {
  try {

    const courses = await getRecentCourses(req.user.id);

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
exports.recentLessons = async (req, res) => {
  try {
    const lessons = await getRecentLessons(req.user.id);

    res.status(200).json({
      success: true,
      lessons,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
exports.recentEnrollments = async (req, res) => {
  try {

    const enrollments = await getRecentEnrollments(req.user.id);

    res.status(200).json({
      success: true,
      enrollments,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


exports.topCourses = async (req, res) => {
  try {

    const courses = await getTopCourses(req.user.id);

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


exports.quizPerformance = async (req, res) => {
  try {

    const performance = await getQuizPerformance(req.user.id);

    res.status(200).json({
      success: true,
      performance,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
