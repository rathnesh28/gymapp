const express = require("express");
const router = express.Router();

const { getStats } = require("../controllers/dashboard.controller");

router.get("/", getStats);

module.exports = router;