const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

exports.loginValidation = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || email.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address",
    });
  }

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters",
    });
  }

  if (password.length > 100) {
    return res.status(400).json({
      success: false,
      message: "Password is too long",
    });
  }

  next();
};
