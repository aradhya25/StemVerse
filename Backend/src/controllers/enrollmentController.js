const { v4: uuidv4 } = require("uuid");

const {
  enrollCourse,
  getMyCourses,
  unenrollCourse,
} = require("../models/enrollmentModel");

exports.enroll = async (req, res) => {
  try {

    const { course_id } = req.body;

    const enrollment = await enrollCourse(
      uuidv4(),
      req.user.id,
      course_id
    );

    res.status(201).json({
      success: true,
      message: "Course enrolled successfully",
      enrollment,
    });

  } catch (error) {

  if (error.code === "23505") {
    return res.status(409).json({
      success: false,
      message: "You are already enrolled in this course."
    });
  }

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};

exports.myCourses = async (req, res) => {
  try {

    const courses = await getMyCourses(req.user.id);

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

exports.unenroll = async (req, res) => {
  try {

    await unenrollCourse(
      req.user.id,
      req.params.courseId
    );

    res.status(200).json({
      success: true,
      message: "Course unenrolled successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};