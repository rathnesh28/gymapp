const express = require("express");
const router = express.Router();

const authController = require("../controllers/gym/auth.controller");
const dashboardController = require("../controllers/gym/dashboard.controller");
const packagesController = require("../controllers/gym/package.controller");
const membersController = require("../controllers/gym/member.controller");
const paymentsController = require("../controllers/gym/payment.controller");
const { loginValidation } = require("../validators/auth.validator");
const { packageCreateValidation, packageUpdateValidation } = require("../validators/package.validator");
const { memberCreateValidation, memberUpdateValidation } = require("../validators/member.validator");
const { paymentValidation } = require("../validators/payment.validator");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const gymOwnerOnly = roleMiddleware("GYM_OWNER");

router.post("/login", loginValidation, authController.login);

router.get("/dashboard", authMiddleware, gymOwnerOnly, dashboardController.dashboard);
router.get("/packages", authMiddleware, gymOwnerOnly, packagesController.list);
router.post("/packages", authMiddleware, gymOwnerOnly, packageCreateValidation, packagesController.create);
router.put("/packages/:id", authMiddleware, gymOwnerOnly, packageUpdateValidation, packagesController.update);
router.delete("/packages/:id", authMiddleware, gymOwnerOnly, packagesController.remove);
router.get("/members", authMiddleware, gymOwnerOnly, membersController.list);
router.post("/members", authMiddleware, gymOwnerOnly, memberCreateValidation, membersController.create);
router.get("/members/:id", authMiddleware, gymOwnerOnly, membersController.getById);
router.put("/members/:id", authMiddleware, gymOwnerOnly, memberUpdateValidation, membersController.update);
router.delete("/members/:id", authMiddleware, gymOwnerOnly, membersController.remove);
router.get("/payments", authMiddleware, gymOwnerOnly, paymentsController.list);
router.post("/payments", authMiddleware, gymOwnerOnly, paymentValidation, paymentsController.create);

module.exports = router;
