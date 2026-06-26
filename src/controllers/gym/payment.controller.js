const paymentsService = require("../../services/gym-payments.service");

const list = async (req, res) => {
  try {
    const data = await paymentsService.list(req.user.gym_id);
    return res.status(200).json({ success: true, message: "Payments loaded successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await paymentsService.create(req.user.gym_id, req.body);
    return res.status(201).json({ success: true, message: "Payment created successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { list, create };
