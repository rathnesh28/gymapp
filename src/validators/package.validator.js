const isNumber = (value) => value !== undefined && value !== null && !Number.isNaN(Number(value));

const packageCreateValidation = (req, res, next) => {
  const { package_name, duration_months, price } = req.body;

  if (!package_name || typeof package_name !== "string") {
    return res.status(400).json({ success: false, message: "Package name is required" });
  }

  if (!Number.isInteger(Number(duration_months))) {
    return res.status(400).json({ success: false, message: "Duration months must be an integer" });
  }

  if (!isNumber(price)) {
    return res.status(400).json({ success: false, message: "Price must be numeric" });
  }

  next();
};

const packageUpdateValidation = (req, res, next) => {
  const { duration_months, price } = req.body;

  if (duration_months !== undefined && !Number.isInteger(Number(duration_months))) {
    return res.status(400).json({ success: false, message: "Duration months must be an integer" });
  }

  if (price !== undefined && !isNumber(price)) {
    return res.status(400).json({ success: false, message: "Price must be numeric" });
  }

  next();
};

module.exports = { packageCreateValidation, packageUpdateValidation };
