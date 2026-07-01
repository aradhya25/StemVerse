const pool = require("../config/db");

const getStudentDashboard = async (userId) => {

  const result = await pool.query(
    `SELECT

(SELECT COUNT(*)
FROM enrollments
WHERE user_id=$1)

AS enrolled_courses,

(SELECT COUNT(*)
FROM progress
WHERE user_id=$1
AND completed=true)

AS completed_lessons,

(SELECT COUNT(*)
FROM progress
WHERE user_id=$1
AND completed=false)

AS pending_lessons,

(SELECT ROUND(AVG(score),2)
FROM quiz_attempts
WHERE user_id=$1)

AS average_score`,

    [userId],
  );

  return result.rows[0];
};

const getContinueLearning = async (userId) => {
  const result = await pool.query(
    `SELECT

c.title AS course_title,

l.title AS lesson_title,

p.watch_time,

p.completed

FROM progress p

JOIN lessons l

ON p.lesson_id=l.id

JOIN courses c

ON l.course_id=c.id

WHERE p.user_id=$1

ORDER BY p.completed ASC,p.watch_time DESC

LIMIT 5`,

    [userId],
  );

  return result.rows;
};

const getRecentAttempts = async (userId) => {
  const result = await pool.query(
    `SELECT

q.title,

a.score,

a.total_questions,

a.attempted_at

FROM quiz_attempts a

JOIN quizzes q

ON a.quiz_id=q.id

WHERE a.user_id=$1

ORDER BY attempted_at DESC

LIMIT 5`,

    [userId],
  );

  return result.rows;
};

module.exports = {
  getStudentDashboard,

  getContinueLearning,

  getRecentAttempts,
};
