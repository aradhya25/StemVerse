const pool = require("../config/db");

const createQuiz = async (
  id,
  lesson_id,
  title,
  description,
  time_limit,
  passing_score
) => {
  const result = await pool.query(
    `INSERT INTO quizzes
    (id, lesson_id, title, description, time_limit, passing_score)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *`,
    [
      id,
      lesson_id,
      title,
      description,
      time_limit,
      passing_score,
    ]
  );

  return result.rows[0];
};

const getAllQuizzes = async () => {
  const result = await pool.query(
    `SELECT * FROM quizzes
     ORDER BY created_at DESC`,
  );

  return result.rows;
};

const getQuizById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM quizzes
     WHERE id=$1`,
    [id],
  );

  return result.rows[0];
};
const getQuizByLesson = async (lessonId) => {
  const result = await pool.query(
    `SELECT *
     FROM quizzes
     WHERE lesson_id = $1
     ORDER BY created_at DESC`,
    [lessonId]
  );

  return result.rows;
};
const updateQuiz = async (id, title, description) => {
  const result = await pool.query(
    `UPDATE quizzes
     SET title=$1,
         description=$2
     WHERE id=$3
     RETURNING *`,
    [title, description, id],
  );

  return result.rows[0];
};

const deleteQuiz = async (id) => {
  await pool.query(
    `DELETE FROM quizzes
     WHERE id=$1`,
    [id],
  );
};

/* Questions */

const addQuestion = async (
  id,
  quiz_id,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_answer,
) => {
  const result = await pool.query(
    `INSERT INTO questions
    (
      id,
      quiz_id,
      question,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_answer
    )

    VALUES($1,$2,$3,$4,$5,$6,$7,$8)

    RETURNING *`,
    [
      id,
      quiz_id,
      question,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_answer,
    ],
  );

  return result.rows[0];
};

const getQuestions = async (quizId) => {
  const result = await pool.query(
    `SELECT *
     FROM questions
     WHERE quiz_id=$1`,
    [quizId],
  );

  return result.rows;
};
const getQuizWithTeacher = async (quizId) => {
  const result = await pool.query(
    `SELECT
        q.id,
        q.title,
        q.lesson_id,
        c.created_by
     FROM quizzes q
     JOIN lessons l
       ON q.lesson_id = l.id
     JOIN courses c
       ON l.course_id = c.id
     WHERE q.id = $1`,
    [quizId],
  );

  return result.rows[0];
};
module.exports = {
  createQuiz,
  getAllQuizzes,
  getQuizById,
   getQuizByLesson,
  getQuizWithTeacher,
  updateQuiz,
  deleteQuiz,
  addQuestion,
  getQuestions,
};
