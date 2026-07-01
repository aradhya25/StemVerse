const pool = require("../config/db");

const addReview = async (
  id,
  user_id,
  course_id,
  rating,
  review
) => {
  const result = await pool.query(
    `INSERT INTO reviews
    (id,user_id,course_id,rating,review)
    VALUES($1,$2,$3,$4,$5)
    RETURNING *`,
    [id, user_id, course_id, rating, review]
  );

  return result.rows[0];
};

const getCourseReviews = async (courseId) => {
  const result = await pool.query(
    `SELECT
        r.*,
        u.name
     FROM reviews r
     JOIN users u
       ON r.user_id=u.id
     WHERE course_id=$1
     ORDER BY created_at DESC`,
    [courseId]
  );

  return result.rows;
};

const updateReview = async (
  reviewId,
  rating,
  review
) => {
  const result = await pool.query(
    `UPDATE reviews
     SET rating=$1,
         review=$2
     WHERE id=$3
     RETURNING *`,
    [rating, review, reviewId]
  );

  return result.rows[0];
};

const deleteReview = async (reviewId) => {
  await pool.query(
    `DELETE FROM reviews
     WHERE id=$1`,
    [reviewId]
  );
};

const getAverageRating = async (courseId) => {
  const result = await pool.query(
    `SELECT
        ROUND(AVG(rating),2) AS average_rating,
        COUNT(*) AS total_reviews
     FROM reviews
     WHERE course_id=$1`,
    [courseId]
  );

  return result.rows[0];
};
const isUserEnrolled = async (userId, courseId) => {
  const result = await pool.query(
    `SELECT *
     FROM enrollments
     WHERE user_id = $1
     AND course_id = $2`,
    [userId, courseId]
  );

  return result.rows[0];
};

module.exports = {
  addReview,
  getCourseReviews,
  updateReview,
  deleteReview,
  getAverageRating,
  isUserEnrolled
};