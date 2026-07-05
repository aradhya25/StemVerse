const pool = require("../config/db");

const getTeacherReviews = async (teacherId) => {
  const result = await pool.query(
    `
    SELECT
        r.id,
        r.rating,
        r.review,
        r.created_at,

        u.id AS student_id,
        u.name AS student_name,
        u.email AS student_email,

        c.id AS course_id,
        c.title AS course_title

    FROM reviews r

    JOIN users u
      ON r.user_id = u.id

    JOIN courses c
      ON r.course_id = c.id

    WHERE c.created_by = $1

    ORDER BY r.created_at DESC
    `,
    [teacherId]
  );

  return result.rows;
};

module.exports = {
  getTeacherReviews,
};