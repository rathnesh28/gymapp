const express = require("express");
const router = express.Router();

const authController = require("../controllers/superadmin/auth.controller");
const { loginValidation } = require("../validators/auth.validator");
const dashboardController = require("../controllers/superadmin/dashboard.controller");
const profileController = require("../controllers/superadmin/profile.controller");
const plansController = require("../controllers/superadmin/plans.controller");
const gymsController = require("../controllers/superadmin/gyms.controller");
const subscriptionsController = require("../controllers/superadmin/subscriptions.controller");
const { updateProfileValidation, changePasswordValidation } = require("../validators/profile.validator");
const { planCreateValidation, planUpdateValidation } = require("../validators/plan.validator");
const { gymCreateValidation, gymUpdateValidation } = require("../validators/gym.validator");
const { subscriptionCreateValidation, subscriptionUpdateValidation } = require("../validators/subscription.validator");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const superAdminOnly = roleMiddleware("SUPER_ADMIN");

router.post("/login", loginValidation, authController.login);

router.get("/profile", authMiddleware, superAdminOnly, profileController.getProfile);
router.put("/profile", authMiddleware, superAdminOnly, updateProfileValidation, profileController.updateProfile);
router.put(
  "/change-password",
  authMiddleware,
  superAdminOnly,
  changePasswordValidation,
  profileController.changePassword
);
router.get("/dashboard", authMiddleware, superAdminOnly, dashboardController.dashboard);
router.get("/plans", authMiddleware, superAdminOnly, plansController.list);
router.post("/plans", authMiddleware, superAdminOnly, planCreateValidation, plansController.create);
router.get("/plans/:id", authMiddleware, superAdminOnly, plansController.getById);
router.put("/plans/:id", authMiddleware, superAdminOnly, planUpdateValidation, plansController.update);
router.delete("/plans/:id", authMiddleware, superAdminOnly, plansController.remove);
router.get("/gyms", authMiddleware, superAdminOnly, gymsController.list);
router.post("/gyms", authMiddleware, superAdminOnly, gymCreateValidation, gymsController.create);
router.get("/gyms/:id", authMiddleware, superAdminOnly, gymsController.getById);
router.put("/gyms/:id", authMiddleware, superAdminOnly, gymUpdateValidation, gymsController.update);
router.delete("/gyms/:id", authMiddleware, superAdminOnly, gymsController.remove);
router.patch(
  "/gyms/:id/status",
  authMiddleware,
  superAdminOnly,
  gymsController.updateStatus
);
router.get("/subscriptions", authMiddleware, superAdminOnly, subscriptionsController.list);
router.post("/subscriptions", authMiddleware, superAdminOnly, subscriptionCreateValidation, subscriptionsController.create);
router.get("/subscriptions/:id", authMiddleware, superAdminOnly, subscriptionsController.getById);
router.put("/subscriptions/:id", authMiddleware, superAdminOnly, subscriptionUpdateValidation, subscriptionsController.update);
router.patch(
  "/subscriptions/:id/status",
  authMiddleware,
  superAdminOnly,
  subscriptionsController.updateStatus
);

module.exports = router;
