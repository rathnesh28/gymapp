const profileService = require("../../services/profile.service");

const getProfile = async (req, res) => {
  try {
    const data = await profileService.getProfile(req.user.id);
    return res.status(200).json({ success: true, message: "Profile loaded successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const data = await profileService.updateProfile(req.user.id, req.body);
    return res.status(200).json({ success: true, message: "Profile updated successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const data = await profileService.changePassword(req.user.id, req.body);
    return res.status(200).json({ success: true, message: "Password changed successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getProfile, updateProfile, changePassword };
