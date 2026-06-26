const isNumber = (value) => value !== undefined && value !== null && !Number.isNaN(Number(value));

const planCreateValidation = (req, res, next) => {
  const { name, price, duration_months } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ success: false, message: "Plan name is required" });
  }

  if (!isNumber(price)) {
    return res.status(400).json({ success: false, message: "Price must be numeric" });
  }

  if (!Number.isInteger(Number(duration_months))) {
    return res.status(400).json({ success: false, message: "Duration months must be an integer" });
  }

  next();
};

const planUpdateValidation = (req, res, next) => {
  const { price, duration_months } = req.body;

  if (price !== undefined && !isNumber(price)) {
    return res.status(400).json({ success: false, message: "Price must be numeric" });
  }

  if (duration_months !== undefined && !Number.isInteger(Number(duration_months))) {
    return res.status(400).json({ success: false, message: "Duration months must be an integer" });
  }

  next();
};

module.exports = { planCreateValidation, planUpdateValidation };
