const superadminRepository = require("../repositories/superadmin.repository");
const { comparePassword, hashPassword } = require("../utils/bcrypt");

const getProfile = async (id) => {
  const admin = await superadminRepository.findById(id);
  if (!admin) throw new Error("Profile not found");
  return admin;
};

const updateProfile = async (id, body) => {
  const admin = await superadminRepository.updateProfile(id, body);
  if (!admin) throw new Error("Profile not found");
  return admin;
};

const changePassword = async (id, body) => {
  const admin = await superadminRepository.findById(id);
  if (!admin) throw new Error("Profile not found");
  const passwordRow = await superadminRepository.findPasswordById(id);
  const ok = await comparePassword(body.current_password, passwordRow.password_hash);
  if (!ok) throw new Error("Current password is incorrect");
  await superadminRepository.updatePassword(id, await hashPassword(body.new_password));
  return { changed: true };
};

module.exports = { getProfile, updateProfile, changePassword };
