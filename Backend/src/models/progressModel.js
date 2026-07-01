const pool = require("../config/db");

const saveProgress = async (
  id,
  user_id,
  lesson_id,
  watch_time,
  completed
) => {
  const result = await pool.query(
    `INSERT INTO progress
    (
      id,
      user_id,
      lesson_id,
      watch_time,
      completed,
      completed_at
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4,
      $5,
      CASE
        WHEN $5 = true
        THEN CURRENT_TIMESTAMP
        ELSE NULL
      END
    )

    ON CONFLICT(user_id, lesson_id)

    DO UPDATE SET

      watch_time = EXCLUDED.watch_time,

      completed = EXCLUDED.completed,

      completed_at =
      CASE
        WHEN EXCLUDED.completed = true
        THEN CURRENT_TIMESTAMP
        ELSE progress.completed_at
      END

    RETURNING *`,
    [
      id,
      user_id,
      lesson_id,
      watch_time,
      completed,
    ]
  );

  return result.rows[0];
};

const getProgress = async (userId) => {
  const result = await pool.query(
    `
    SELECT
      p.id,
      p.lesson_id,
      l.title AS lesson_title,
      c.id AS course_id,
      c.title AS course_title,
      p.watch_time,
      p.completed,
      p.completed_at
    FROM progress p
    JOIN lessons l
      ON p.lesson_id = l.id
    JOIN courses c
      ON l.course_id = c.id
    WHERE p.user_id = $1
    ORDER BY p.completed_at DESC
    `,
    [userId]
  );

  return result.rows;
};
module.exports = {

  saveProgress,

  getProgress

};