const express = require("express");

const router = express.Router();

const { validateBody } = require("../../utils");

const { authenticate } = require("../../middlewars");

const { schemas } = require("../../models/user");

const usersControllers = require("../../controllers/users-controllers");

router.post(
  "/register",
  validateBody(schemas.userRegistrationSchema),
  usersControllers.register
);

router.post(
  "/login",
  validateBody(schemas.userLoginSchema),
  usersControllers.login
);

router.get("/current", authenticate, usersControllers.current);

router.post("/logout", authenticate, usersControllers.logout);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.userSubscriptionUpdateSchema),
  usersControllers.updateSubscription
);

module.exports = router;
