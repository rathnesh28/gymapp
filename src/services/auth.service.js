const superadminRepository = require("../repositories/superadmin.repository");
const { comparePassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");

const loginSuperAdmin = async (email, password) => {
  const admin = await superadminRepository.findByEmail(email);

  if (!admin) {
    throw new Error("Invalid email or password");
  }

  if (!admin.status) {
    throw new Error("Account is inactive");
  }

  const isMatch = await comparePassword(password, admin.password_hash);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  await superadminRepository.updateLastLogin(admin.id);

  const token = generateToken({
    id: admin.id,
    role: "SUPER_ADMIN",
    email: admin.email,
  });

  return {
    token,
    admin: {
      id: admin.id,
      full_name: admin.full_name,
      email: admin.email,
      mobile: admin.mobile,
      profile_image: admin.profile_image,
    },
  };
};

module.exports = {
  loginSuperAdmin,
};
