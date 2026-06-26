const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

const gymCreateValidation = (req, res, next) => {
  const { gym_name, owner_name, email, password } = req.body;

  if (!gym_name || typeof gym_name !== "string") {
    return res.status(400).json({ success: false, message: "Gym name is required" });
  }

  if (!owner_name || typeof owner_name !== "string") {
    return res.status(400).json({ success: false, message: "Owner name is required" });
  }

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Valid email is required" });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
  }

  next();
};

const gymUpdateValidation = (req, res, next) => {
  const { email, password } = req.body;

  if (email !== undefined && !emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Valid email is required" });
  }

  if (password !== undefined && password.length < 8) {
    return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
  }

  next();
};

module.exports = { gymCreateValidation, gymUpdateValidation };
