const passwordRule = (value) => typeof value === "string" && value.length >= 8 && value.length <= 100;

const updateProfileValidation = (req, res, next) => {
  const { full_name, email, mobile, profile_image } = req.body;

  if (full_name !== undefined && typeof full_name !== "string") {
    return res.status(400).json({ success: false, message: "Full name must be a string" });
  }

  if (email !== undefined && (typeof email !== "string" || !email.trim())) {
    return res.status(400).json({ success: false, message: "Email must be a valid string" });
  }

  if (mobile !== undefined && typeof mobile !== "string") {
    return res.status(400).json({ success: false, message: "Mobile must be a string" });
  }

  if (profile_image !== undefined && typeof profile_image !== "string") {
    return res.status(400).json({ success: false, message: "Profile image must be a string" });
  }

  next();
};

const changePasswordValidation = (req, res, next) => {
  const { current_password, new_password, confirm_password } = req.body;

  if (!current_password || !new_password || !confirm_password) {
    return res.status(400).json({ success: false, message: "All password fields are required" });
  }

  if (!passwordRule(new_password)) {
    return res.status(400).json({ success: false, message: "New password must be between 8 and 100 characters" });
  }

  if (new_password !== confirm_password) {
    return res.status(400).json({ success: false, message: "Passwords do not match" });
  }

  next();
};

module.exports = {
  updateProfileValidation,
  changePasswordValidation,
};
