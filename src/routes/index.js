const express = require("express");
const router = express.Router();

const superadminRoutes = require("./superadmin.routes");
const gymRoutes = require("./gym.routes");

router.use("/superadmin", superadminRoutes);
router.use("/gym", gymRoutes);

module.exports = router;
