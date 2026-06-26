const membersService = require("../../services/gym-members.service");

const list = async (req, res) => {
  try {
    const data = await membersService.list(req.user.gym_id);
    return res.status(200).json({ success: true, message: "Members loaded successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await membersService.create(req.user.gym_id, req.body);
    return res.status(201).json({ success: true, message: "Member created successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await membersService.getById(req.user.gym_id, req.params.id);
    return res.status(200).json({ success: true, message: "Member loaded successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await membersService.update(req.user.gym_id, req.params.id, req.body);
    return res.status(200).json({ success: true, message: "Member updated successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const data = await membersService.remove(req.user.gym_id, req.params.id);
    return res.status(200).json({ success: true, message: "Member deleted successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { list, create, getById, update, remove };
