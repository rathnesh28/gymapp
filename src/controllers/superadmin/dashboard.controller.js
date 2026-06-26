const dashboardService = require("../../services/dashboard.service");

const dashboard = async (req, res) => {
  try {
    const data = await dashboardService.getDashboard();
    return res.status(200).json({
      success: true,
      message: "Dashboard loaded successfully",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  dashboard,
};
