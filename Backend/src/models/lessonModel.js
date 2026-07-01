const pool = require("../config/db");

const createLesson = async (id, course_id, title, content, order_no) => {
  const result = await pool.query(
    `INSERT INTO lessons
    (id,course_id,title,content,order_no)
    VALUES($1,$2,$3,$4,$5)
    RETURNING *`,
    [id, course_id, title, content, order_no],
  );

  return result.rows[0];
};

const getAllLessons = async () => {
  const result = await pool.query(
    `SELECT * FROM lessons
     ORDER BY created_at DESC`,
  );

  return result.rows;
};

const getLessonById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM lessons
     WHERE id=$1`,
    [id],
  );

  return result.rows[0];
};

const getLessonsByCourse = async (courseId) => {
  const result = await pool.query(
    `SELECT * FROM lessons
     WHERE course_id=$1
     ORDER BY created_at ASC`,
    [courseId],
  );

  return result.rows;
};

const updateLesson = async (id, title, content, order_no) => {
  const result = await pool.query(
    `UPDATE lessons
     SET title=$1,
         content=$2,
         order_no=$3
     WHERE id=$4
     RETURNING *`,
    [title, content, order_no, id],
  );

  return result.rows[0];
};

const deleteLesson = async (id) => {
  await pool.query(
    `DELETE FROM lessons
     WHERE id=$1`,
    [id],
  );
};
const updateVideo = async (lessonId, videoType, videoUrl) => {
  const result = await pool.query(
    `UPDATE lessons
     SET video_type=$1,
         video_url=$2
     WHERE id=$3
     RETURNING *`,
    [videoType, videoUrl, lessonId],
  );

  return result.rows[0];
};

module.exports = {
  createLesson,
  getAllLessons,
  getLessonById,
  getLessonsByCourse,
  updateLesson,
  deleteLesson,
  updateVideo,
};
