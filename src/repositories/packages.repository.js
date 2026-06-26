const pool = require("../config/db");

const listByGym = async (gymId) => (await pool.query("SELECT * FROM packages WHERE gym_id = $1 ORDER BY id DESC", [gymId])).rows;
const findById = async (gymId, id) =>
  (await pool.query("SELECT * FROM packages WHERE gym_id = $1 AND id = $2", [gymId, id])).rows[0];
const create = async (data) => {
  const result = await pool.query(
    `INSERT INTO packages (gym_id, package_name, duration_months, price, description, status)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [data.gym_id, data.package_name, data.duration_months ?? null, data.price ?? null, data.description ?? null, data.status ?? true]
  );
  return result.rows[0];
};
const update = async (gymId, id, data) => {
  const result = await pool.query(
    `UPDATE packages SET
      package_name = COALESCE($1, package_name),
      duration_months = COALESCE($2, duration_months),
      price = COALESCE($3, price),
      description = COALESCE($4, description),
      status = COALESCE($5, status)
     WHERE gym_id = $6 AND id = $7 RETURNING *`,
    [data.package_name ?? null, data.duration_months ?? null, data.price ?? null, data.description ?? null, data.status ?? null, gymId, id]
  );
  return result.rows[0];
};
const remove = async (gymId, id) => (await pool.query("DELETE FROM packages WHERE gym_id = $1 AND id = $2 RETURNING *", [gymId, id])).rows[0];

module.exports = { listByGym, findById, create, update, remove };
