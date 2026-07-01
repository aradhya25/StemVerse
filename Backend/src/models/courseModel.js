const pool = require("../config/db");

const createCourse = async (
  id,
  title,
  description,
  language,
  thumbnail,
  created_by
) => {
  const result = await pool.query(
    `INSERT INTO courses
    (id,title,description,language,thumbnail,created_by)
    VALUES($1,$2,$3,$4,$5,$6)
    RETURNING *`,
    [id, title, description, language, thumbnail, created_by]
  );

  return result.rows[0];
};

const getAllCourses = async () => {
  const result = await pool.query(
    `SELECT * FROM courses
     ORDER BY created_at DESC`
  );

  return result.rows;
};

const getCourseById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM courses
     WHERE id=$1`,
    [id]
  );

  return result.rows[0];
};

const getMyCourses = async (teacherId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM courses
    WHERE created_by = $1
    ORDER BY created_at DESC
    `,
    [teacherId]
  );

  return result.rows;
};
const updateCourse = async (
  id,
  title,
  description,
  language,
  thumbnail
) => {
  const result = await pool.query(
    `UPDATE courses
     SET title=$1,
         description=$2,
         language=$3,
         thumbnail=$4
     WHERE id=$5
     RETURNING *`,
    [title, description, language, thumbnail, id]
  );

  return result.rows[0];
};

const deleteCourse = async (id) => {
  await pool.query(
    `DELETE FROM courses
     WHERE id=$1`,
    [id]
  );
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getMyCourses
};