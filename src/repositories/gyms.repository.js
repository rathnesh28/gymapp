const pool = require("../config/db");

const list = async () => (await pool.query("SELECT * FROM gyms ORDER BY id DESC")).rows;
const findById = async (id) => (await pool.query("SELECT * FROM gyms WHERE id = $1", [id])).rows[0];
const findByEmail = async (email) => (await pool.query("SELECT * FROM gyms WHERE email = $1", [email])).rows[0];
const create = async (data) => {
  const result = await pool.query(
    `INSERT INTO gyms
     (gym_name, owner_name, email, password_hash, phone, alternate_phone, address, city, state, country, pincode, logo, gst_number, status, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
     RETURNING *`,
    [
      data.gym_name,
      data.owner_name,
      data.email,
      data.password_hash,
      data.phone ?? null,
      data.alternate_phone ?? null,
      data.address ?? null,
      data.city ?? null,
      data.state ?? null,
      data.country ?? null,
      data.pincode ?? null,
      data.logo ?? null,
      data.gst_number ?? null,
      data.status ?? true,
      data.created_by,
    ]
  );
  return result.rows[0];
};
const update = async (id, data) => {
  const result = await pool.query(
    `UPDATE gyms SET
      gym_name = COALESCE($1, gym_name),
      owner_name = COALESCE($2, owner_name),
      email = COALESCE($3, email),
      phone = COALESCE($4, phone),
      alternate_phone = COALESCE($5, alternate_phone),
      address = COALESCE($6, address),
      city = COALESCE($7, city),
      state = COALESCE($8, state),
      country = COALESCE($9, country),
      pincode = COALESCE($10, pincode),
      logo = COALESCE($11, logo),
      gst_number = COALESCE($12, gst_number),
      status = COALESCE($13, status),
      updated_at = CURRENT_TIMESTAMP
     WHERE id = $14
     RETURNING *`,
    [
      data.gym_name ?? null,
      data.owner_name ?? null,
      data.email ?? null,
      data.phone ?? null,
      data.alternate_phone ?? null,
      data.address ?? null,
      data.city ?? null,
      data.state ?? null,
      data.country ?? null,
      data.pincode ?? null,
      data.logo ?? null,
      data.gst_number ?? null,
      data.status ?? null,
      id,
    ]
  );
  return result.rows[0];
};
const remove = async (id) => (await pool.query("DELETE FROM gyms WHERE id = $1 RETURNING *", [id])).rows[0];
const updateStatus = async (id, status) =>
  (await pool.query("UPDATE gyms SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *", [status, id])).rows[0];

module.exports = { list, findById, findByEmail, create, update, remove, updateStatus };
