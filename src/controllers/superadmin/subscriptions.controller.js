const subscriptionsService = require("../../services/subscriptions.service");

const list = async (req, res) => {
  try {
    const data = await subscriptionsService.list();
    return res.status(200).json({ success: true, message: "Subscriptions loaded successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await subscriptionsService.create(req.body);
    return res.status(201).json({ success: true, message: "Subscription created successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await subscriptionsService.getById(req.params.id);
    return res.status(200).json({ success: true, message: "Subscription loaded successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await subscriptionsService.update(req.params.id, req.body);
    return res.status(200).json({ success: true, message: "Subscription updated successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const data = await subscriptionsService.updateStatus(req.params.id, req.body);
    return res.status(200).json({ success: true, message: "Subscription status updated successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { list, create, getById, update, updateStatus };
