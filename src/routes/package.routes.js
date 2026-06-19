const express = require("express");
const router = express.Router();

const {
    addPackage,
    getPackages,
    getPackageList
} = require("../controllers/package.controller");

router.post("/add", addPackage);
router.get("/", getPackages);
router.get("/list", getPackageList);

module.exports = router;
