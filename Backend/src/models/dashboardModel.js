const pool = require("../config/db");

const getTeacherDashboard = async (teacherId) => {
  const result = await pool.query(
    `
    SELECT
      (
        SELECT COUNT(*)
        FROM courses
        WHERE created_by = $1
      ) AS total_courses,

      (
        SELECT COUNT(*)
        FROM lessons l
        JOIN courses c
          ON l.course_id = c.id
        WHERE c.created_by = $1
      ) AS total_lessons,

      (
        SELECT COUNT(*)
        FROM quizzes q
        JOIN lessons l
          ON q.lesson_id = l.id
        JOIN courses c
          ON l.course_id = c.id
        WHERE c.created_by = $1
      ) AS total_quizzes,

      (
        SELECT COUNT(*)
        FROM enrollments e
        JOIN courses c
          ON e.course_id = c.id
        WHERE c.created_by = $1
      ) AS total_students,

      (
        SELECT COUNT(*)
        FROM progress p
        JOIN lessons l
          ON p.lesson_id = l.id
        JOIN courses c
          ON l.course_id = c.id
        WHERE c.created_by = $1
          AND p.completed = true
      ) AS completed_lessons
    `,
    [teacherId]
  );

  return result.rows[0];
};
const getRecentCourses = async (teacherId) => {
  const result = await pool.query(
    `SELECT
    id,
    title,
    description,
    language,
    thumbnail,
    created_at
  FROM courses
  WHERE created_by = $1
  ORDER BY created_at DESC
  LIMIT 5;`,
    [teacherId],
  );

  return result.rows;
};

const getRecentEnrollments = async (teacherId) => {
  const result = await pool.query(
    `SELECT
        u.name,
        u.email,
        c.title,
        e.enrolled_at
     FROM enrollments e
     JOIN users u
       ON e.user_id = u.id
     JOIN courses c
       ON e.course_id = c.id
     WHERE c.created_by = $1
     ORDER BY e.enrolled_at DESC
     LIMIT 10`,
    [teacherId],
  );

  return result.rows;
};

const getTopCourses = async (teacherId) => {
  const result = await pool.query(
    `SELECT
        c.id,
        c.title,
        COUNT(e.user_id)::int AS total_students
     FROM courses c
     LEFT JOIN enrollments e
       ON c.id = e.course_id
     WHERE c.created_by = $1
     GROUP BY c.id
     ORDER BY total_students DESC`,
    [teacherId],
  );

  return result.rows;
};
const getRecentLessons = async (teacherId) => {
  const result = await pool.query(
    `
    SELECT
      l.id,
      l.title AS lesson_title,
      c.title AS course_title,
      l.order_no,
      l.created_at
    FROM lessons l
    JOIN courses c
      ON l.course_id = c.id
    WHERE c.created_by = $1
    ORDER BY l.created_at DESC
    LIMIT 5
    `,
    [teacherId]
  );

  return result.rows;
};
const getQuizPerformance = async (teacherId) => {
  const result = await pool.query(
    `SELECT
        q.title,
        ROUND(AVG(a.score),2) AS average_score
     FROM quiz_attempts a
     JOIN quizzes q
       ON a.quiz_id = q.id
     JOIN lessons l
       ON q.lesson_id = l.id
     JOIN courses c
       ON l.course_id = c.id
     WHERE c.created_by = $1
     GROUP BY q.id
     ORDER BY average_score DESC`,
    [teacherId],
  );

  return result.rows;
};
module.exports = {
  getTeacherDashboard,
  getRecentCourses,
  getRecentEnrollments,
  getTopCourses,
  getQuizPerformance,
  getRecentLessons,
};
