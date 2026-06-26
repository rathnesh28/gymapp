const pool = require("../config/db");

const findById = async (id) => {
  const result = await pool.query(
    "SELECT id, full_name, email, mobile, profile_image, status, last_login, created_at, updated_at FROM superadmins WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

const findByEmail = async (email) => {
  const result = await pool.query(
    "SELECT id, full_name, email, password_hash, mobile, profile_image, status, last_login, created_at, updated_at FROM superadmins WHERE email = $1",
    [email]
  );
  return result.rows[0];
};

const updateProfile = async (id, data) => {
  const result = await pool.query(
    `UPDATE superadmins
     SET full_name = COALESCE($1, full_name),
         email = COALESCE($2, email),
         mobile = COALESCE($3, mobile),
         profile_image = COALESCE($4, profile_image),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $5
     RETURNING id, full_name, email, mobile, profile_image, status, last_login, created_at, updated_at`,
    [data.full_name ?? null, data.email ?? null, data.mobile ?? null, data.profile_image ?? null, id]
  );
  return result.rows[0];
};

const updatePassword = async (id, passwordHash) => {
  const result = await pool.query(
    "UPDATE superadmins SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id",
    [passwordHash, id]
  );
  return result.rows[0];
};

const updateLastLogin = async (id) => {
  const result = await pool.query(
    "UPDATE superadmins SET last_login = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING id",
    [id]
  );
  return result.rows[0];
};

const findPasswordById = async (id) => {
  const result = await pool.query("SELECT password_hash FROM superadmins WHERE id = $1", [id]);
  return result.rows[0];
};

module.exports = { findById, findByEmail, updateProfile, updatePassword, updateLastLogin, findPasswordById };
