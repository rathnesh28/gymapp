const plansService = require("../../services/plans.service");

const list = async (req, res) => {
  try {
    const data = await plansService.list();
    return res.status(200).json({ success: true, message: "Plans loaded successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await plansService.create(req.body);
    return res.status(201).json({ success: true, message: "Plan created successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await plansService.getById(req.params.id);
    return res.status(200).json({ success: true, message: "Plan loaded successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await plansService.update(req.params.id, req.body);
    return res.status(200).json({ success: true, message: "Plan updated successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const data = await plansService.remove(req.params.id);
    return res.status(200).json({ success: true, message: "Plan deleted successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { list, create, getById, update, remove };
