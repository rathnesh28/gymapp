const pool = require("../config/db");

const getDashboard = async () => {
  const [gyms, plans, subscriptions, revenue] = await Promise.all([
    pool.query("SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE status = true)::int AS active, COUNT(*) FILTER (WHERE status = false)::int AS inactive FROM gyms"),
    pool.query("SELECT COUNT(*)::int AS total FROM plans"),
    pool.query("SELECT COUNT(*) FILTER (WHERE status = 'Active')::int AS active, COUNT(*) FILTER (WHERE status = 'Expired')::int AS expired FROM subscriptions"),
    pool.query("SELECT COALESCE(SUM(amount), 0)::numeric AS monthly_revenue FROM subscriptions WHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE)"),
  ]);

  return {
    totalGyms: gyms.rows[0].total,
    activeGyms: gyms.rows[0].active,
    inactiveGyms: gyms.rows[0].inactive,
    totalPlans: plans.rows[0].total,
    activeSubscriptions: subscriptions.rows[0].active,
    expiredSubscriptions: subscriptions.rows[0].expired,
    monthlyRevenue: revenue.rows[0].monthly_revenue,
  };
};

module.exports = { getDashboard };
