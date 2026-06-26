const gymsService = require("../../services/gyms.service");

const list = async (req, res) => {
  try {
    const data = await gymsService.list();
    return res.status(200).json({ success: true, message: "Gyms loaded successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await gymsService.create(req.body, req.user.id);
    return res.status(201).json({ success: true, message: "Gym created successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await gymsService.getById(req.params.id);
    return res.status(200).json({ success: true, message: "Gym loaded successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await gymsService.update(req.params.id, req.body);
    return res.status(200).json({ success: true, message: "Gym updated successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const data = await gymsService.remove(req.params.id);
    return res.status(200).json({ success: true, message: "Gym deleted successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const data = await gymsService.updateStatus(req.params.id, req.body);
    return res.status(200).json({ success: true, message: "Gym status updated successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { list, create, getById, update, remove, updateStatus };
