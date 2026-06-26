const gymsRepository = require("../repositories/gyms.repository");
const { comparePassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");

const login = async (email, password) => {
  const gym = await gymsRepository.findByEmail(email);
  if (!gym) throw new Error("Invalid email or password");
  if (!gym.status) throw new Error("Account is inactive");

  const ok = await comparePassword(password, gym.password_hash);
  if (!ok) throw new Error("Invalid email or password");

  const token = generateToken({
    id: gym.id,
    role: "GYM_OWNER",
    gym_id: gym.id,
  });

  return {
    token,
    gym: {
      id: gym.id,
      gym_name: gym.gym_name,
      owner_name: gym.owner_name,
      email: gym.email,
      phone: gym.phone,
      status: gym.status,
    },
  };
};

module.exports = { login };
