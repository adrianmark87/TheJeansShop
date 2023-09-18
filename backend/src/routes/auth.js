const express = require("express");

const router = express.Router();
const authController = require("../controllers/authControllers/LoginController");
const passwordForgottenController = require("../controllers/authControllers/PasswordForgottenController");
const passwordResetController = require("../controllers/authControllers/PasswordResetController");

/* POST : login a user. */
router.post("/login", authController);

router.post("/password_forgotten", passwordForgottenController);
router.post("/password_reset", passwordResetController);

module.exports = router;
