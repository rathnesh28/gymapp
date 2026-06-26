const pool = require("../config/db");

const list = async () => (await pool.query("SELECT * FROM plans ORDER BY id DESC")).rows;
const findById = async (id) => (await pool.query("SELECT * FROM plans WHERE id = $1", [id])).rows[0];
const create = async (data) => {
  const result = await pool.query(
    `INSERT INTO plans
     (name, description, price, duration_months, max_members, max_trainers, max_branches, can_use_attendance, can_use_reports, can_use_whatsapp, can_use_sms, can_use_expense, status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
     RETURNING *`,
    [
      data.name,
      data.description ?? null,
      data.price,
      data.duration_months,
      data.max_members ?? null,
      data.max_trainers ?? null,
      data.max_branches ?? 1,
      data.can_use_attendance ?? true,
      data.can_use_reports ?? true,
      data.can_use_whatsapp ?? false,
      data.can_use_sms ?? false,
      data.can_use_expense ?? true,
      data.status ?? true,
    ]
  );
  return result.rows[0];
};
const update = async (id, data) => {
  const result = await pool.query(
    `UPDATE plans SET
      name = COALESCE($1, name),
      description = COALESCE($2, description),
      price = COALESCE($3, price),
      duration_months = COALESCE($4, duration_months),
      max_members = COALESCE($5, max_members),
      max_trainers = COALESCE($6, max_trainers),
      max_branches = COALESCE($7, max_branches),
      can_use_attendance = COALESCE($8, can_use_attendance),
      can_use_reports = COALESCE($9, can_use_reports),
      can_use_whatsapp = COALESCE($10, can_use_whatsapp),
      can_use_sms = COALESCE($11, can_use_sms),
      can_use_expense = COALESCE($12, can_use_expense),
      status = COALESCE($13, status),
      updated_at = CURRENT_TIMESTAMP
     WHERE id = $14
     RETURNING *`,
    [
      data.name ?? null,
      data.description ?? null,
      data.price ?? null,
      data.duration_months ?? null,
      data.max_members ?? null,
      data.max_trainers ?? null,
      data.max_branches ?? null,
      data.can_use_attendance ?? null,
      data.can_use_reports ?? null,
      data.can_use_whatsapp ?? null,
      data.can_use_sms ?? null,
      data.can_use_expense ?? null,
      data.status ?? null,
      id,
    ]
  );
  return result.rows[0];
};
const remove = async (id) => (await pool.query("DELETE FROM plans WHERE id = $1 RETURNING *", [id])).rows[0];

module.exports = { list, findById, create, update, remove };
