const pool = require("../config/db");

const listByGym = async (gymId) => (await pool.query("SELECT * FROM payments WHERE gym_id = $1 ORDER BY id DESC", [gymId])).rows;
const create = async (data) => {
  const result = await pool.query(
    `INSERT INTO payments (gym_id, member_id, package_id, amount, payment_date, payment_method, transaction_id, notes)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [data.gym_id, data.member_id ?? null, data.package_id ?? null, data.amount ?? null, data.payment_date ?? null, data.payment_method ?? null, data.transaction_id ?? null, data.notes ?? null]
  );
  return result.rows[0];
};

module.exports = { listByGym, create };
