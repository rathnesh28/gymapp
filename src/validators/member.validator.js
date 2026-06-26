const isNumber = (value) => value !== undefined && value !== null && !Number.isNaN(Number(value));

const memberCreateValidation = (req, res, next) => {
  const { full_name, weight, height } = req.body;

  if (!full_name || typeof full_name !== "string") {
    return res.status(400).json({ success: false, message: "Full name is required" });
  }

  if (weight !== undefined && !isNumber(weight)) {
    return res.status(400).json({ success: false, message: "Weight must be numeric" });
  }

  if (height !== undefined && !isNumber(height)) {
    return res.status(400).json({ success: false, message: "Height must be numeric" });
  }

  next();
};

const memberUpdateValidation = (req, res, next) => {
  const { weight, height } = req.body;

  if (weight !== undefined && !isNumber(weight)) {
    return res.status(400).json({ success: false, message: "Weight must be numeric" });
  }

  if (height !== undefined && !isNumber(height)) {
    return res.status(400).json({ success: false, message: "Height must be numeric" });
  }

  next();
};

module.exports = { memberCreateValidation, memberUpdateValidation };
