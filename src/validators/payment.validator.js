const isNumber = (value) => value !== undefined && value !== null && !Number.isNaN(Number(value));

const paymentValidation = (req, res, next) => {
  const { amount, payment_date } = req.body;

  if (!isNumber(amount)) {
    return res.status(400).json({ success: false, message: "Amount must be numeric" });
  }

  if (!payment_date) {
    return res.status(400).json({ success: false, message: "Payment date is required" });
  }

  next();
};

module.exports = { paymentValidation };
