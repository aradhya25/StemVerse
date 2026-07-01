const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const {
  createLesson,
  getAllLessons,
  getLessonById,
  getLessonsByCourse,
  updateLesson,
  deleteLesson,
  updateVideo,
} = require("../models/lessonModel");

exports.createLesson = async (req, res) => {
  try {
    const { course_id, title, content, order_no } = req.body;

    const lesson = await createLesson(
      uuidv4(),
      course_id,
      title,
      content,
      order_no,
    );

    res.status(201).json({
      success: true,
      message: "Lesson created successfully",
      lesson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await getAllLessons();

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

exports.getLessonById = async (req, res) => {
  try {
    const lesson = await getLessonById(req.params.id);

    res.status(200).json({
      success: true,
      lesson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getLessonsByCourse = async (req, res) => {
  try {
    console.log("Course ID:", req.params.courseId);

    const lessons = await getLessonsByCourse(req.params.courseId);

    console.log("Lessons:", lessons);

    res.status(200).json({
      success: true,
      lessons,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateLesson = async (req, res) => {
  try {
    const { title, content, order_no } = req.body;

    const lesson = await updateLesson(req.params.id, title, content, order_no);

    res.status(200).json({
      success: true,
      message: "Lesson updated successfully",
      lesson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteLesson = async (req, res) => {
  try {
    await deleteLesson(req.params.id);

    res.status(200).json({
      success: true,
      message: "Lesson deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No video uploaded",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: "stemverse/videos",
    });

    // Save Cloudinary URL in database
    const lesson = await updateVideo(
      req.params.id,
      "upload",
      result.secure_url
    );

    // Delete temporary local file
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting temp file:", err);
      } else {
        console.log("Temp file deleted successfully");
      }
    });

    res.status(200).json({
      success: true,
      message: "Video uploaded successfully",
      lesson,
      videoUrl: result.secure_url,
      public_id: result.public_id,
    });

  } catch (err) {

    console.error(err);

    if (req.file && req.file.path) {
      fs.unlink(req.file.path, () => {});
    }

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.addYoutubeVideo = async (req, res) => {
  try {
    const { videoUrl } = req.body;

    const lesson = await updateVideo(req.params.id, "youtube", videoUrl);

    res.status(200).json({
      success: true,
      lesson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
