const pool = require("../config/db.js");

const createUser = async (id, name, email, password, role) => {
  const result = await pool.query(
    `INSERT INTO users(id,name,email,password,role)
     VALUES($1,$2,$3,$4,$5)
     RETURNING *`,
    [id, name, email, password, role],
  );

  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  return result.rows[0];
};
const getUserById = async (userId) => {
  const result = await pool.query(
    `SELECT
        id,
        name,
        email,
        role,
        created_at
     FROM users
     WHERE id = $1`,
    [userId]
  );

  return result.rows[0];
};

const getUserWithPassword = async (userId) => {
  const result = await pool.query(
    `SELECT *
     FROM users
     WHERE id = $1`,
    [userId]
  );

  return result.rows[0];
};

const updateProfile = async (userId, name) => {
  const result = await pool.query(
    `UPDATE users
     SET name = $1
     WHERE id = $2
     RETURNING
        id,
        name,
        email,
        role,
        created_at`,
    [name, userId]
  );

  return result.rows[0];
};

const changePassword = async (userId, hashedPassword) => {
  const result = await pool.query(
    `UPDATE users
     SET password = $1
     WHERE id = $2
     RETURNING id`,
    [hashedPassword, userId]
  );

  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  getUserById,
  getUserWithPassword,
  updateProfile,
  changePassword,
};