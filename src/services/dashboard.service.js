const dashboardRepository = require("../repositories/dashboard.repository");

const getDashboard = async () => dashboardRepository.getDashboard();

module.exports = { getDashboard };
