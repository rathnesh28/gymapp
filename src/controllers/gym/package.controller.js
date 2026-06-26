const packagesService = require("../../services/gym-packages.service");

const list = async (req, res) => {
  try {
    const data = await packagesService.list(req.user.gym_id);
    return res.status(200).json({ success: true, message: "Packages loaded successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await packagesService.create(req.user.gym_id, req.body);
    return res.status(201).json({ success: true, message: "Package created successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await packagesService.update(req.user.gym_id, req.params.id, req.body);
    return res.status(200).json({ success: true, message: "Package updated successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const data = await packagesService.remove(req.user.gym_id, req.params.id);
    return res.status(200).json({ success: true, message: "Package deleted successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { list, create, update, remove };
