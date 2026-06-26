const pool = require("../config/db");

const list = async () => (await pool.query("SELECT * FROM subscriptions ORDER BY id DESC")).rows;
const findById = async (id) => (await pool.query("SELECT * FROM subscriptions WHERE id = $1", [id])).rows[0];
const create = async (data) => {
  const result = await pool.query(
    `INSERT INTO subscriptions (gym_id, plan_id, start_date, end_date, amount, payment_status, status)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
    [
      data.gym_id,
      data.plan_id,
      data.start_date,
      data.end_date,
      data.amount,
      data.payment_status ?? "Paid",
      data.status ?? "Active",
    ]
  );
  return result.rows[0];
};
const update = async (id, data) => {
  const result = await pool.query(
    `UPDATE subscriptions SET
      gym_id = COALESCE($1, gym_id),
      plan_id = COALESCE($2, plan_id),
      start_date = COALESCE($3, start_date),
      end_date = COALESCE($4, end_date),
      amount = COALESCE($5, amount),
      payment_status = COALESCE($6, payment_status),
      status = COALESCE($7, status)
     WHERE id = $8 RETURNING *`,
    [data.gym_id ?? null, data.plan_id ?? null, data.start_date ?? null, data.end_date ?? null, data.amount ?? null, data.payment_status ?? null, data.status ?? null, id]
  );
  return result.rows[0];
};
const updateStatus = async (id, status) =>
  (await pool.query("UPDATE subscriptions SET status = $1 WHERE id = $2 RETURNING *", [status, id])).rows[0];

module.exports = { list, findById, create, update, updateStatus };
