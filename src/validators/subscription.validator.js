const isNumber = (value) => value !== undefined && value !== null && !Number.isNaN(Number(value));

const subscriptionCreateValidation = (req, res, next) => {
  const { gym_id, plan_id, start_date, end_date, amount } = req.body;

  if (!Number.isInteger(Number(gym_id))) {
    return res.status(400).json({ success: false, message: "Gym ID is required" });
  }

  if (!Number.isInteger(Number(plan_id))) {
    return res.status(400).json({ success: false, message: "Plan ID is required" });
  }

  if (!start_date || !end_date) {
    return res.status(400).json({ success: false, message: "Start date and end date are required" });
  }

  if (!isNumber(amount)) {
    return res.status(400).json({ success: false, message: "Amount must be numeric" });
  }

  next();
};

const subscriptionUpdateValidation = (req, res, next) => {
  const { gym_id, plan_id, amount } = req.body;

  if (gym_id !== undefined && !Number.isInteger(Number(gym_id))) {
    return res.status(400).json({ success: false, message: "Gym ID must be an integer" });
  }

  if (plan_id !== undefined && !Number.isInteger(Number(plan_id))) {
    return res.status(400).json({ success: false, message: "Plan ID must be an integer" });
  }

  if (amount !== undefined && !isNumber(amount)) {
    return res.status(400).json({ success: false, message: "Amount must be numeric" });
  }

  next();
};

module.exports = { subscriptionCreateValidation, subscriptionUpdateValidation };
