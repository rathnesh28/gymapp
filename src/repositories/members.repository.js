const pool = require("../config/db");

const listByGym = async (gymId) => (await pool.query("SELECT * FROM members WHERE gym_id = $1 ORDER BY id DESC", [gymId])).rows;
const findById = async (gymId, id) =>
  (await pool.query("SELECT * FROM members WHERE gym_id = $1 AND id = $2", [gymId, id])).rows[0];
const create = async (data) => {
  const result = await pool.query(
    `INSERT INTO members
     (gym_id, member_code, full_name, gender, dob, phone, email, address, weight, height, join_date, photo, status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
    [data.gym_id, data.member_code ?? null, data.full_name, data.gender ?? null, data.dob ?? null, data.phone ?? null, data.email ?? null, data.address ?? null, data.weight ?? null, data.height ?? null, data.join_date ?? null, data.photo ?? null, data.status ?? true]
  );
  return result.rows[0];
};
const update = async (gymId, id, data) => {
  const result = await pool.query(
    `UPDATE members SET
      member_code = COALESCE($1, member_code),
      full_name = COALESCE($2, full_name),
      gender = COALESCE($3, gender),
      dob = COALESCE($4, dob),
      phone = COALESCE($5, phone),
      email = COALESCE($6, email),
      address = COALESCE($7, address),
      weight = COALESCE($8, weight),
      height = COALESCE($9, height),
      join_date = COALESCE($10, join_date),
      photo = COALESCE($11, photo),
      status = COALESCE($12, status),
      updated_at = CURRENT_TIMESTAMP
     WHERE gym_id = $13 AND id = $14 RETURNING *`,
    [data.member_code ?? null, data.full_name ?? null, data.gender ?? null, data.dob ?? null, data.phone ?? null, data.email ?? null, data.address ?? null, data.weight ?? null, data.height ?? null, data.join_date ?? null, data.photo ?? null, data.status ?? null, gymId, id]
  );
  return result.rows[0];
};
const remove = async (gymId, id) => (await pool.query("DELETE FROM members WHERE gym_id = $1 AND id = $2 RETURNING *", [gymId, id])).rows[0];

module.exports = { listByGym, findById, create, update, remove };
