const pool = require("../config/db");

const dashboard = async (gymId) => {
  const [members, packages, payments, revenue] = await Promise.all([
    pool.query("SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE status = true)::int AS active FROM members WHERE gym_id = $1", [gymId]),
    pool.query("SELECT COUNT(*)::int AS total FROM packages WHERE gym_id = $1", [gymId]),
    pool.query("SELECT COUNT(*)::int AS total FROM payments WHERE gym_id = $1", [gymId]),
    pool.query("SELECT COALESCE(SUM(amount), 0)::numeric AS revenue FROM payments WHERE gym_id = $1 AND payment_date >= DATE_TRUNC('month', CURRENT_DATE)", [gymId]),
  ]);

  return {
    totalMembers: members.rows[0].total,
    activeMembers: members.rows[0].active,
    totalPackages: packages.rows[0].total,
    totalPayments: payments.rows[0].total,
    monthlyRevenue: revenue.rows[0].revenue,
  };
};

module.exports = { dashboard };
