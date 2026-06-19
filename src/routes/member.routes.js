const express = require("express");
const router = express.Router();

const {
    addMember,
    getMembers,
    updateMember,
    deleteMember,
    getGenderList,
    getPackageList
} = require("../controllers/member.controller");

router.post("/add", addMember);
router.get("/", getMembers);
router.put("/:id", updateMember);
router.delete("/:id", deleteMember);
router.get("/gender/list", getGenderList);



module.exports = router;
