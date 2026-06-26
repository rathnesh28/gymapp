const authService = require("../../services/gym-auth.service");

const login = async (req, res) => {
  try {
    const data = await authService.login(req.body.email, req.body.password);
    return res.status(200).json({ success: true, message: "Login successful", data });
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

module.exports = { login };
